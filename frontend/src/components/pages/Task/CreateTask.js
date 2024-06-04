import api from "../../../utils/api";
// import styles from "./CreateTask.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";
import TaskForm from "../../form/TaskForm";

function CreateTask() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerTask(task) {
    let msgType = "success";

    let formData = new FormData();

    await Object.keys(task).forEach((key) => {
      formData.append(key, task[key]);
    });

    console.log(formData);

    const data = await api
      .post("/tasks/create/", formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    if (msgType !== "error") {
      navigate("/tasks/mytasks");
    }

    console.log(formData);
  }

  return (
    <section>
      <h1>Add a Task</h1>
      <TaskForm handleSubmit={registerTask} btnText="Add Task" />
    </section>
  );
}

export default CreateTask;
