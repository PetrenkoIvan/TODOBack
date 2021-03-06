const Task = require("../../db/models/task/index");

module.exports.getAllTasks = (req, res) => {
  try {
    Task.find().then((result) => {
      res.send({ data: result.reverse()});
    });
  } catch {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.createNewTask = (req, res) => {
  const text = req.body.text
  if (text !== '') {
    const task = new Task(req.body);
    task.save().then((result) => {
      Task.find().then((result) => {
        res.send({ data: result.reverse() });
      });
    });
  } else res.status(422).send('Error! Params not correct');
};

module.exports.deleteTask = (req, res) => {
  const id = req.query.id;
  if (id) {
    Task.deleteOne({ _id: id }).then(() => {
      Task.find().then((result) => {
        res.send({data: result.reverse()});
      });
    });
  } else res.status(422).send('Error! Params not correct');
};

module.exports.changeTaskInfo = (req, res) => {
  if (req.body.id) {
    const id = req.body.id;
    Task.updateOne({ _id: id }, req.body).then(() => {
      Task.find().then((result) => {
        res.send({data: result.reverse()});
      });
    });
  }  else res.status(422).send('Error! Params not correct');
};
