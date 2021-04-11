import { differenceInHours, format, addHours } from "date-fns";

import { firebaseServer } from "./../../config/firebase/server";

const db = firebaseServer.firestore();
const agenda = db.collection("agenda");

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const timeBlocks = [];

for (let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), "HH:mm");
  timeBlocks.push(time);
}

export default async (req, res) => {
  console.log(timeBlocks);
  return res.status(200).json(timeBlocks);
  // try {
  //   const snapshot = await db
  //     .where("when", "==", req.query.when)
  //     .get();
  //   return res.status(200).json(snapshot.docs);
  // } catch (e) {
  //   console.log("FB Error", e);
  //   return res.status(500);
  // }
};
