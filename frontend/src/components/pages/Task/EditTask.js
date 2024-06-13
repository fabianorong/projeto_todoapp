import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Input from "../../form/Input";
import styles from "./CreateTask.module.css";
import TaskForm from "../../form/TaskForm";
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditTask() {
  const [task, setTask] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/tasks/mytasks/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTask(response.data.task);
      });
  }, [token, id]);

  async function updateTask(task) {
    let msgType = "success";

    const data = await api
      .patch(`/tasks/mytasks/${task._id}`, task, {
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
  }

  return (
    <section>
      <div className={styles.addtask_header}>
        <h1>Editing the task: {task.name}</h1>
        <p>flintons</p>
      </div>
      {task.name && (
        <TaskForm handleSubmit={updateTask} btnText="Update" taskData={task} />
      )}
    </section>
  );
}

export default EditTask;
