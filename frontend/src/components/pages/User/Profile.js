import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./Profile.module.css";
import formstyles from "../../form/Form.module.css";

import Input from "../../form/Input";

import useFlashMessage from "../../../hooks/useFlashMessage";

function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "success";

    const data = await api
      .patch(`/users/edit/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
      </div>

      <form onSubmit={handleSubmit} className={formstyles.form_container}>
        <Input
          text="Name"
          type="text"
          name="name"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          handleOnChange={handleChange}
          value={user.email || ""}
        />

        <input type="submit" value="Update" />
      </form>
    </section>
  );
}

export default Profile;
