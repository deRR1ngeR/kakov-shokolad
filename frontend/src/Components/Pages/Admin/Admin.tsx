import { useContext, useEffect } from "react";
import classes from "./styles/Admin.module.css";
import Button from "@mui/material/Button";
import { User } from "../../../interfaces/user.interface";
import { Link } from "react-router-dom";
import { UserContext } from "@/App";

export const Admin = () => {
  const user: User = useContext(UserContext);

  useEffect(() => {
    if (user.role !== "ADMIN") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className={classes.adminCont}>
      <Link to="/admin-panel/users">
        <Button className={classes.adminPageButton} variant="outlined">
          Управление пользователями
        </Button>
      </Link>
      <Link to="/admin-panel/orders">
        <Button className={classes.adminPageButton} variant="outlined">
          Управление заказами
        </Button>
      </Link>
      <Link to="/admin-panel/coupons">
        <Button className={classes.adminPageButton} variant="outlined">
          Управление купонами
        </Button>
      </Link>
      <Link to="/admin-panel/product">
        <Button className={classes.adminPageButton} variant="outlined">
          Управление товарами
        </Button>
      </Link>
    </div>
  );
};
