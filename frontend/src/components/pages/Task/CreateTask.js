// CreateTask.js
import { useState } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import TaskForm from "../../form/TaskForm";
import { createTask } from "../../../hooks/taskService";

import styles from "./Dashboard.module.css";

function CreateTask({ tasks, setTasks }) {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  async function registerTask(task) {
    console.log("Registering task:", task);
    let msgType = "success";

    try {
      const data = await createTask(task, token);
      console.log("Task created successfully:", data);
      setFlashMessage(data.message, msgType);
      setTasks((prevTasks) => [...prevTasks, data.newTask]);
    } catch (err) {
      console.error("Error creating task:", err);
      msgType = "error";
      setFlashMessage(err.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.tasklist_header}>
        <h1>My Tasks</h1>
        <TaskForm handleSubmit={registerTask} btnText="Add Task" />
      </div>
    </section>
  );
}

export default CreateTask;
