import { useContext, useState } from "react";

import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";

//contexts
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //enviar o usuario para o banco
    register(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <Input
          text="Username"
          type="text"
          name="name"
          // placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />

        <Input
          text="Email"
          type="email"
          name="email"
          // placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          // placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm your Password"
          type="password"
          name="confirmpassword"
          // placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account?&nbsp; <Link to="/login"> Sign in</Link>
      </p>
    </section>
  );
}

export default Register;
