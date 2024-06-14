import api from "../../../utils/api";

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

    const data = await api
      .post("/tasks/create/", task, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
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
      navigate("/task/mytasks");
    }

    console.log(task);
  }

  return (
    <section>
      <h1>Add a Task</h1>
      <TaskForm handleSubmit={registerTask} btnText="Add Task" />
    </section>
  );
}

export default CreateTask;
