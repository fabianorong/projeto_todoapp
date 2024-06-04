import { useState } from "react";

import { Link } from "react-router-dom";

function MyTask() {
  const [tasks, setTasks] = useState([]);

  return (
    <section>
      <div>
        <h1>My Tasks</h1>
        <Link to="/tasks/create">Add Task</Link>
        <div>
          {tasks.length > 0 && <p>My Tasks</p>}
          {tasks.length === 0 && <p>There is no Task added</p>}
        </div>
      </div>
    </section>
  );
}

export default MyTask;
