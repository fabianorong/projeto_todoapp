import api from "../../../utils/api";
import { useState } from "react";
import Input from "../../form/Input";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "../../form/Form.module.css";

//context
// import { Context } from "../../../context/UserContext";

function ResetPassword() {
  const [user, setUser] = useState({});
  const { token } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";

    const data = await api
      .patch(`users/resetpassword/${token}`, user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
    if (msgType !== "error") {
      navigate("/login");
    }
  }

  return (
    <section className={styles.form_container}>
      <h1>Enter New Password</h1>

      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Confirm" />
      </form>
    </section>
  );
}

export default ResetPassword;
