/* eslint-disable new-cap */
const eslint = require("express").Router();
const {ESLint} = require("eslint");
const {createStats} = require("../queries/userStats");

eslint.get("/", (req, res) => {
  res.json({result: "Please use POST method to get a result"});
});

eslint.post("/", async (req, res) => {
  const lint = new ESLint();
  const result = await lint.lintText(req.body.input);
  // eslint-disable-next-line max-len
  if (req.body.uid && result[0].messages.length > 0 && !result[0].messages[0]?.fatal) {
    const data = {...req.body, result: result[0].messages};
    await createStats(data);
  }
  res.json({result});
});

eslint.post("/fix", async (req, res) => {
  const lint = new ESLint({fix: true});
  const fixedResult = await lint.lintText(req.body.input);
  res.json({fixedResult});
});

module.exports = eslint;
