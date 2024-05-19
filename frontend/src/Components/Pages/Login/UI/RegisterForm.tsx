import { useState } from "react";
import classes from "../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@services";
import { useSetUser } from "@hooks";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }
    try {
      await AuthService.FetchRegistration({
        email,
        password,
        name,
        phoneNumber,
      }).then(() => {
        useSetUser();
        navigate("/");
        window.location.reload();
      });
    } catch (err: any) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form>
        <input
          placeholder="Имя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="Номер телефона"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="Повторите пароль"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <label>{message}</label>
        <br />
        <Link to={"/login"}>
          <label
            style={{
              fontSize: "15px",
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {" "}
            Уже есть аккаунт?
          </label>
        </Link>
        <button
          className={classes.show_all_btn}
          type="button"
          onClick={handleRegister}
        >
          Регистрация
        </button>
      </form>
    </div>
  );
};
