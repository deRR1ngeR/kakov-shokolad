import { RegisterForm } from "./UI/RegisterForm";
import classes from "./styles/Login.module.css";

export const Register = () => {
  return (
    <div>
      <div className={classes.container}>
        <RegisterForm />
      </div>
    </div>
  );
};
