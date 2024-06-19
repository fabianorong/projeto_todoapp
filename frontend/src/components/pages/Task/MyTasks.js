import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateTask from "./CreateTask";
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./Dashboard.module.css";
import { deleteTask, concludeTask } from "../../../hooks/taskService";
import api from "../../../utils/api";

// import rowstyles from "../../form/Row.module.css";

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

  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const tasks = await getTasks(token);
  //       setTasks(tasks);
  //     } catch (err) {
  //       setFlashMessage(err.message, "error");
  //     }
  //   }
  //   fetchTasks();
  // }, [token, setFlashMessage]);

  async function handleRemoveTask(id) {
    let msgType = "success";

    try {
      const data = await deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setFlashMessage(data.message, msgType);
    } catch (err) {
      msgType = "error";
      setFlashMessage(err.message, msgType);
    }
  }

  async function handleConcludeTask(id) {
    let msgType = "success";

    try {
      const data = await concludeTask(id, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, done: true } : task
        )
      );
      setFlashMessage(data.message, msgType);
    } catch (err) {
      msgType = "error";
      setFlashMessage(err.message, msgType);
    }
  }

  return (
    <section>
      <div className={styles.tasklist_container_all}>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <div className={styles.tasklist_header}>
          {/* <h1>My Tasks</h1> */}

          <div className={styles.tasklist_container}>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task && (
                    <div className={styles.tasklist_row} key={task._id}>
                      <span className="bold">{task.name}</span>
                      <span className="bold">{task.effort}</span>
                      <span className="bold">{task.period}</span>
                      <div className={styles.actions}>
                        {task.done === false ? (
                          <>
                            <button
                              className={styles.conclude_btn}
                              onClick={() => handleConcludeTask(task._id)}
                            >
                              Concluir Task
                            </button>

                            <Link to={`/task/edit/${task._id}`}>Edit</Link>

                            <button onClick={() => handleRemoveTask(task._id)}>
                              Excluir
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleRemoveTask(task._id)}>
                              Excluir
                            </button>
                            <p>Task concluida</p>
                          </>
                        )}
                      </div>
                    </div>
                  )
              )}
            {tasks.length === 0 && <p>There is no Task added</p>}
          </div>
        </div>
      </div>
      {/* <div className={styles.add_btn}>
        <Link to="/tasks/create">Add Task</Link>
      </div> */}
    </section>
  );
}

export default MyTask;
