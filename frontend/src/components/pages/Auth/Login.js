import { useState, useContext } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";

//context
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Email"
          type="email"
          name="email"
          // placeholder="digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          // placeholder="digite a sua senha"
          handleOnChange={handleChange}
        />
        <div className={styles.form_container_link}>
          <Link to="/forgotpassword">Forgot your password?</Link>
        </div>
        <input type="submit" value="Log In" />
      </form>
      <p>
        Don't have an account yet?&nbsp; <Link to="/register">Create One</Link>
      </p>
    </section>
  );
}

export default Login;
