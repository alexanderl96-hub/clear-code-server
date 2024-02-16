const db = require("../db/dbConfig");

const getAllStats = async (uid) => {
  try {
    const allStats = await db.any("SELECT * FROM stats WHERE uid=$1", uid);
    return allStats;
  } catch (err) {
    return err;
  }
};

const getAnnualStats = async (date, uid) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    const allStats = await db.any(
        `SELECT * FROM stats WHERE uid=$1 AND date LIKE '%${year.to_char}%'`,
        uid,
    );

    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });

    const filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });
    const stats = [];
    for (let i = 0; i < filter.length; i++) {
      const statMonthly = [];
      for (let j = 1; j < 13; j++) {
        const result = await db.one(
            // eslint-disable-next-line max-len
            `SELECT COUNT(message_id) AS "$2" FROM stats WHERE uid=$1 AND message_id=$2 AND date LIKE '%${
              year.to_char
            }-${j < 10 ? "0" + j : j}%'`,
            [uid, filter[i]],
        );
        statMonthly.push(result);
      }
      stats.push(statMonthly);
    }
    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByDayPieChart = async (date, uid) => {
  try {
    const day = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY-MM-DD')`);
    const allStats = await db.any(
        `SELECT * FROM stats WHERE uid=$1 AND date LIKE '%${day.to_char}%'`,
        uid,
    );

    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });

    const filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });

    const stats = filter.map((elem) => {
      const count = async () => {
        return await db.one(
            // eslint-disable-next-line max-len
            `SELECT COUNT(message_id) AS "$2" FROM stats WHERE uid=$1 AND message_id=$2 AND date LIKE '%${day.to_char}%'`,
            [uid, elem],
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByWeekPieChart = async (date, uid) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    const week = await db.one(`SELECT TO_CHAR(DATE '${date}', 'WW')`);
    const allStats = await db.any(
        // eslint-disable-next-line max-len
        `SELECT * FROM stats WHERE uid=$1 AND week=$2 AND date LIKE '%${year.to_char}-%'`,
        [uid, week.to_char],
    );

    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });

    const filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });

    const stats = filter.map((elem) => {
      const count = async () => {
        return await db.one(
            // eslint-disable-next-line max-len
            `SELECT COUNT(message_id) AS "$2" FROM stats WHERE uid=$1 AND message_id=$2 AND week=$3 AND date LIKE '%${year.to_char}-%'`,
            [uid, elem, week.to_char],
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByMonthPieChart = async (date, uid) => {
  try {
    const month = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY-MM')`);
    const allStats = await db.any(
        `SELECT * FROM stats WHERE uid=$1 AND date LIKE '%${month.to_char}%'`,
        uid,
    );

    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });

    const filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });

    const stats = filter.map((elem) => {
      const count = async () => {
        return await db.one(
            // eslint-disable-next-line max-len
            `SELECT COUNT(message_id) AS "$2" FROM stats WHERE uid=$1 AND message_id=$2 AND date LIKE '%${month.to_char}%'`,
            [uid, elem],
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByYearPieChart = async (date, uid) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    const allStats = await db.any(
        `SELECT * FROM stats WHERE uid=$1 AND date LIKE '%${year.to_char}%'`,
        uid,
    );

    const wordArr = allStats.map((elem) => {
      return elem.message_id;
    });

    const filter = wordArr.filter((elem, i) => {
      return wordArr.indexOf(elem) === i;
    });

    const stats = filter.map((elem) => {
      const count = async () => {
        return await db.one(
            // eslint-disable-next-line max-len
            `SELECT COUNT(message_id) AS "$2" FROM stats WHERE uid=$1 AND message_id=$2 AND date LIKE '%${year.to_char}-%'`,
            [uid, elem],
        );
      };
      return count();
    });

    return Promise.all(stats);
  } catch (error) {
    return error;
  }
};

const getByDayBarChart = async (date, uid) => {
  try {
    const day = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY-MM-DD')`);
    const dayData = await db.any(
        // eslint-disable-next-line max-len
        `SELECT message_id, severity FROM stats WHERE uid=$1 AND date LIKE '%${day.to_char}%'`,
        uid,
    );
    return dayData;
  } catch (error) {
    return error;
  }
};

const getByWeekBarChart = async (date, uid) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    const week = await db.one(`SELECT TO_CHAR(DATE '${date}', 'WW')`);
    const weekData = await db.any(
        // eslint-disable-next-line max-len
        `SELECT message_id, severity FROM stats WHERE uid=$1 AND week=$2 AND date LIKE '%${year.to_char}-%'`,
        [uid, week.to_char],
    );
    return weekData;
  } catch (error) {
    return error;
  }
};

const getByMonthBarChart = async (date, uid) => {
  try {
    const month = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY-MM')`);
    const monthData = await db.any(
        // eslint-disable-next-line max-len
        `SELECT message_id, severity FROM stats WHERE uid=$1 AND date LIKE '%${month.to_char}%'`,
        uid,
    );
    return monthData;
  } catch (error) {
    return error;
  }
};

const getByYearBarChart = async (date, uid) => {
  try {
    const year = await db.one(`SELECT TO_CHAR(DATE '${date}', 'YYYY')`);
    const yearData = await db.any(
        // eslint-disable-next-line max-len
        `SELECT message_id, severity FROM stats WHERE uid=$1 AND date LIKE '%${year.to_char}-%'`,
        uid,
    );
    return yearData;
  } catch (error) {
    return error;
  }
};

const createStats = async ({input, uid, result}) => {
  try {
    let qString =
      // eslint-disable-next-line max-len
      "INSERT INTO stats (message_id, message, source_code, severity, uid) VALUES ";
    let count = 0;
    qString += Array.from(
        {length: result.length},
        // eslint-disable-next-line max-len
        () => `($${++count}, $${++count}, $${++count}, $${++count}, $${++count})`,
    ).join(",");

    const qArray = [];
    result.forEach((stat) =>
      qArray.push(stat.ruleId, stat.message, input, stat.severity, uid),
    );

    await db.none(qString, qArray);
  } catch (error) {
    console.log(error);
  }
};

const deleteStat = async (uid) => {
  try {
    await db.none("DELETE FROM stats WHERE uid = $1", uid);
  } catch (error) {
    return error;
  }
};

module.exports = {
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
  createStats,
  deleteStat,
};
