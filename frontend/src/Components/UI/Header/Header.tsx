import { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { SvgIcon } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { User } from "../../../interfaces/user.interface";
import { AuthService } from "@services";
import { useGetUser } from "@hooks";
import { config } from ".";
const Header = () => {
  const { logoItem, menuItems } = config;

  const [user, setUser] = useState({} as User);

  const updateUserFromLocalStorage = () => {
    const userLogin = useGetUser();
    if (userLogin.id) {
      setUser(userLogin);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    updateUserFromLocalStorage();
  }, []);

  const logout = async () => {
    navigate("/");
    await AuthService.FetchLogout()
      .then(() => {
        setUser({} as User);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <header className={classes.myHeader}>
        <Link className={classes.homeImg} to={logoItem.link}>
          <img
            src={logoItem.imagePath}
            alt={logoItem.title}
            style={{ width: "100px", height: "100px", justifyContent: "left" }}
          />
        </Link>
        <nav>
          <ul className={classes["header-list"]}>
            {menuItems.map((item, index) =>
              item.link == "/catalog" ? (
                <li key={index}>
                  <Link className={classes.menuItem} to={`${item.link}/1`}>
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li key={index}>
                  <Link className={classes.menuItem} to={item.link}>
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {user.id ? (
          <div className={classes.profile}>
            <div
              style={{ display: "flex", gap: "5px", cursor: "pointer" }}
              onClick={logout}
            >
              <SvgIcon component={ExitToAppIcon} inheritViewBox />
              <label style={{ cursor: "pointer" }}>Exit</label>
            </div>
            <Link
              to={"/cart"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <SvgIcon component={ShoppingCartOutlined} />
            </Link>
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              <label style={{ cursor: "pointer" }}>{user.name}</label>
            </Link>
          </div>
        ) : (
          <Link to={"/login"}>
            <SvgIcon component={FaceIcon} inheritViewBox />
          </Link>
        )}
      </header>
      <hr style={{ width: "80%" }} />
    </>
  );
};

export default Header;
