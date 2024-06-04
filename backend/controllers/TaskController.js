const Task = require("../models/Task");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class TaskController {
  //create a task
  static async create(req, res) {
    const { name, effort, period } = req.body;
    const done = false;

    //validations
    if (name == undefined) {
      res.status(422).json({ message: "O nome da tarefa é obrigatório" });
      return;
    }
    if (!effort) {
      res.status(422).json({ message: "O nivel de esforço é obrigatório" });
      return;
    }
    if (!period) {
      res
        .status(422)
        .json({ message: "O periodo da execução da tarefa é obrigatória" });
      return;
    }

    // get task owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    //create a task
    const task = new Task({
      name,
      effort,
      period,
      done,
      user: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newTask = await task.save();
      res.status(201).json({
        message: "Task cadastrado com sucesso!",
        newTask,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getAllUserTasks(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const tasks = await Task.find({ "user._id": user._id });
    // .sort("-createdAt");

    res.status(200).json({
      tasks,
    });
  }

  static async getTaskById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID da tarefa inválido!" });
      return;
    }

    //check if task exists
    const task = await Task.findOne({ _id: id });

    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json({
      task: task,
    });
  }

  static async removeTaskById(req, res) {
    const id = req.params.id;

    //check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID da tarefa inválido!" });
      return;
    }

    //check if tasks exists
    const task = await Task.findOne({ _id: id });

    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (task.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Tarefa removida com sucesso!" });
  }

  static async updateTask(req, res) {
    const id = req.params.id;

    const { name, effort, period, done } = req.body;

    const updatedData = {};

    //check if tasks exists
    const task = await Task.findOne({ _id: id });

    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    //check if logged in user registered the task
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (task.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    //validation
    if (!name) {
      res.status(422).json({ message: "O nome da tarefa é obrigatório" });
      return;
    } else {
      updatedData.name = name;
    }

    if (!effort) {
      res.status(422).json({ message: "O nivel de esforço é obrigatório" });
      return;
    } else {
      updatedData.effort = effort;
    }

    if (!period) {
      res
        .status(422)
        .json({ message: "O periodo da execução da tarefa é obrigatória" });
      return;
    } else {
      updatedData.period = period;
    }

    await Task.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
  }

  static async concludeTask(req, res) {
    const id = req.params.id;

    //check if tasks exists
    const task = await Task.findOne({ _id: id });

    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    //check if logged in user registered the task
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (task.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    task.done = true;

    await Task.findByIdAndUpdate(id, task);

    res.status(200).json({
      message: "Tarefa concluída com sucesso!",
    });
  }
};
