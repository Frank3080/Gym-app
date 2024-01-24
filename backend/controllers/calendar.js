const calendarRouter = require("express").Router();
const Event = require("../models/event");
const moment = require("moment");

calendarRouter.post("/", async (req, res) => {
  const event = Event(req.body);
  await event.save();
  res.sendStatus(201);
});

calendarRouter.get("/", async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });

  res.send(events);
});

module.exports = calendarRouter;
