/* eslint-disable new-cap */
const express = require("express");
const {ESLint} = require("eslint");
const {createStats} = require("../queries/userStats");
const eslint = express.Router();

eslint.get("/", (req, res) => {
  res.json({result: "Please use POST method to get a result"});
});

eslint.post("/", async (req, res) => {
  try {
    const lint = new ESLint();
    const result = await lint.lintText(req.body.input);
    // eslint-disable-next-line max-len
    if (req.body.uid && result[0].messages.length > 0 && !result[0].messages[0]?.fatal) {
      const data = {...req.body, result: result[0].messages};
      await createStats(data);
    }
    res.json({result});
  } catch (error) {
    console.error("Error occurred while linting:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

eslint.post("/fix", async (req, res) => {
  try {
    const lint = new ESLint({fix: true});
    const fixedResult = await lint.lintText(req.body.input);
    res.json({fixedResult});
  } catch (error) {
    console.error("Error occurred while fixing:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

module.exports = eslint;
