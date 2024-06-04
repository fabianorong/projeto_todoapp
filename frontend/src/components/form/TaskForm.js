import { useState } from "react";

import Input from "./Input";
import Select from "./Select";

import formstyles from "./Form.module.css";

function TaskForm({ handleSubmit, taskData, btnText }) {
  const [task, setTask] = useState(taskData || {});
  const period = ["Morning", "Afternoon", "Evening", "Night"];
  const effort = ["Easy", "Normal", "Hard"];

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function handleEffort(e) {
    setTask({ ...task, effort: e.target.options[e.target.selectedIndex].text });
  }

  function handlePeriod(e) {
    setTask({ ...task, period: e.target.options[e.target.selectedIndex].text });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(task);
  }

  return (
    <form onSubmit={submit} className={formstyles.form_container}>
      <Input
        text="Task Name"
        type="text"
        name="name"
        handleOnChange={handleChange}
        value={task.name || ""}
      />

      <Select
        name="effort"
        text="Effort Level"
        options={effort}
        handleOnChange={handleEffort}
        value={task.effort || ""}
      />
      <Select
        name="period"
        text="Period"
        options={period}
        handleOnChange={handlePeriod}
        value={task.period || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default TaskForm;
