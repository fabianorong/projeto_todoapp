import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.home}>
      <h1>
        Organize your <br /> work and life, finally.
      </h1>
      <p>
        Become focused, organized, and calm with Todo App. the World's #1 task
        manager app.
      </p>

      <button class={styles.home_btn}>
        <Link to="/task/mytasks">Make Todo List</Link>
      </button>

      {/* <div className={styles.add_btn}>
        <Link to="/tasks/create">Add Task</Link>
      </div> */}
    </div>
  );
}

export default Home;
