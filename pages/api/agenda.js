export default async (req, res) => {
  console.log("Params", req.query);
  res.status(200).json({ msg: "Success!" });
};
