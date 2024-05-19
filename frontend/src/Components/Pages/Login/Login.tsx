import classes from "./styles/Login.module.css";
import { LoginForm } from "./UI/LoginForm";

export const Login = () => {
  return (
    <div>
      <div className={classes.container}>
        <LoginForm />
      </div>
    </div>
  );
};
