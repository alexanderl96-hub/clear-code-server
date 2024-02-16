/* eslint-disable new-cap */
const stats = require("express").Router();
const {
  getAllStats,
  getByDayPieChart,
  getByDayBarChart,
  getByWeekPieChart,
  getByWeekBarChart,
  getByMonthPieChart,
  getByMonthBarChart,
  getByYearPieChart,
  getByYearBarChart,
  getAnnualStats,
  deleteStat,
} = require("../queries/userStats");

stats.get("/", async (req, res) => {
  try {
    const allStats = await getAllStats(req.query.uid);
    if (allStats.code === "ECONNREFUSED") {
      // eslint-disable-next-line no-throw-literal
      throw "Unable to connect to the database";
    } else {
      res.status(200).json({
        success: true,
        payload: allStats,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/daily", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const daily = await getByDayPieChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: daily,
      });
    } else {
      const daily = await getByDayBarChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: daily,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/weekly", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const weekly = await getByWeekPieChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: weekly,
      });
    } else {
      const weekly = await getByWeekBarChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: weekly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/monthly", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const monthly = await getByMonthPieChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: monthly,
      });
    } else {
      const monthly = await getByMonthBarChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: monthly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/annually", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const yearly = await getByYearPieChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: yearly,
      });
    } else {
      const yearly = await getByYearBarChart(req.body.date, req.body.uid);
      res.status(200).json({
        success: true,
        payload: yearly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/annual-chart", async (req, res) => {
  try {
    const annual = await getAnnualStats(req.body.date, req.body.uid);
    res.status(200).json({
      success: true,
      payload: annual,
    });
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.delete("/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    if (!uid) {
      // eslint-disable-next-line no-throw-literal
      throw "User does not exist!";
    }

    await deleteStat(uid);
    res.status(200).json({
      success: true,
      payload: "user data deleted from database",
    });
  } catch (e) {
    res.status(404).json({
      error: "Statistic not deleted",
      message: e,
    });
  }
});

module.exports = stats;
