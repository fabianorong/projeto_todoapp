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
                <div className={styles.actions}>
                  {task.done === false ? (
                    <>
                      <button className={styles.conclude_btn}>
                        Concluir Task
                      </button>
                      <Link to={`/task/edit/${task._id}`}>Edit</Link>
                      <button>Excluir</button>
                    </>
                  ) : (
                    <p>Task concluida</p>
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
