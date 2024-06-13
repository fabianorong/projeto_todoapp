import { useEffect, useState } from "react";
import api from "../../../utils/api";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";

function MyTask() {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/tasks/mytasks", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
      });
  }, [token]);

  async function removeTask(id) {
    let msgType = "success";

    const data = await api
      .delete(`/tasks/mytasks/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeTask(id) {
    let msgType = "success";

    const data = await api
      .patch(`/tasks/mytasks/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
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
      <div className={styles.tasklist_header}>
        <h1>My Tasks</h1>
        {/* <Link to="/tasks/create">Add Task</Link> */}

        <div className={styles.tasklist_container}>
          {tasks.length > 0 &&
            tasks.map((task) => (
              <div className={styles.tasklist_row} key={task._id}>
                <span className="bold">{task.name}</span>
                <span className="bold">{task.effort}</span>
                <span className="bold">{task.period}</span>
                <div className={styles.actions}>
                  {task.done === false ? (
                    <>
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeTask(task._id);
                        }}
                      >
                        Concluir Task
                      </button>
                      <Link to={`/task/edit/${task._id}`}>Edit</Link>
                      <button
                        onClick={() => {
                          removeTask(task._id);
                        }}
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          removeTask(task._id);
                        }}
                      >
                        Excluir
                      </button>
                      <p>Task concluida</p>
                    </>
                  )}
                </div>
              </div>
            ))}

          {tasks.length === 0 && <p>There is no Task added</p>}
        </div>
      </div>
      <div className={styles.add_btn}>
        <Link to="/tasks/create">Add Task</Link>
      </div>
    </section>
  );
}

export default MyTask;
