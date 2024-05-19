import { useState } from "react";
import classes from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { AuthService } from "@services";
import { useNavigate } from "react-router-dom";
import { useSetUser } from "@hooks";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      await AuthService.FetchLogin({ email, password }).then(() => {
        useSetUser().then(() => {
          navigate("/");
          window.location.reload();
        });
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
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label style={{ color: "red" }}>{message}</label>
        <br />
        <Link to={"/register"}>
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
            Еще не зарегестрированы?
          </label>
        </Link>

        <button
          className={classes.show_all_btn}
          type="button"
          onClick={handleLogin}
        >
          Войти
        </button>
      </form>
    </div>
  );
};
