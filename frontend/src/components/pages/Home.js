import styles from "./Home.module.css";

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

      <button class={styles.home_btn}>Make Todo List</button>
    </div>
  );
}

export default Home;
