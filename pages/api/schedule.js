import { differenceInHours, format, addHours } from "date-fns";

import { firebaseServer } from "./../../config/firebase/server";

const db = firebaseServer.firestore();
const agenda = db.collection("agenda");
const profile = db.collection("profiles");

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const timeBlocks = [];

for (let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), "HH:mm");
  timeBlocks.push(time);
}

const getUserId = async (userName) => {
  const profileDoc = await profile.where("username", "==", userName).get();

  if (!profileDoc.length) {
    return false;
  }

  const { userId } = profileDoc.docs[0].data();

  return userId;
};

const setSchedule = async (req, res) => {
  const userId = await getUserId(req.body.username);
  const docId = `${userId}#${req.body.date}#${req.body.time}`;
  const doc = await agenda.doc(docId).get();

  if (doc.exists) {
    return res.status(400).json({ message: "Horário já reservado" });
  }

  const block = await agenda.doc(docId).set({
    userId,
    time: req.body.time,
    date: req.body.date,
    name: req.body.name,
    phone: req.body.phone,
  });

  return res.status(200).json(block);
};

const getSchedule = async (req, res) => {
  try {
    const userId = await getUserId(req.query.username);

    if (!userId) {
      return res.status(404).json({ message: "Usuário inválido" });
    }

    const snapshot = await agenda
      .where("date", "==", req.query.date)
      .where("userId", "==", userId)
      .get();

    const docs = snapshot.docs.map((doc) => doc.data());

    const result = timeBlocks.map((time) => ({
      time,
      isBlocked: !!docs.find((doc) => doc.time === time),
    }));

    return res.status(200).json(result);
  } catch (e) {
    console.log("FB Error", e);
    return res.status(500);
  }
};

// Como alternativa para os vários ifs e elses para saber qual metodo está sendo chamado
// foi criado um HASHMAP
const methods = {
  POST: setSchedule,
  GET: getSchedule,
};

export default async (req, res) =>
  methods[req.method] ? methods[req.method](req, res) : res.status(405);
