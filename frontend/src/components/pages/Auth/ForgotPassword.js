import { useState, useContext } from "react";
import Input from "../../form/Input";
// import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";

//context
import { Context } from "../../../context/UserContext";

// import useFlashMessage from "../../../hooks/useFlashMessage";

function ForgotPassword() {
  const [user, setUser] = useState({});
  const { forgotpassword } = useContext(Context);
  //   const { setFlashMessage } = useFlashMessage();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //enviar o usuario para o banco
    forgotpassword(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Getting back into your To Do App account</h1>

      <form onSubmit={handleSubmit}>
        <Input
          text="Email"
          type="email"
          name="email"
          // placeholder="digite o seu email"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Reset Password" />
      </form>
    </section>
  );
}

export default ForgotPassword;
