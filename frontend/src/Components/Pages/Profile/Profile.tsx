import { useContext, useEffect, useState } from "react";
import classes from "./styles/Profile.module.css";
import { GetOrderDto } from "@services/dto";
import { OrderTable } from "./UI/OrderTable";
import { Link } from "react-router-dom";
import { User } from "src/interfaces/user.interface";
import { UserContext } from "@/App";
import { OrderService } from "@/Components/service";
import { useSetUser } from "@/hooks";

export const Profile = () => {
  const user: User = useContext(UserContext);

  const [orders, setOrders] = useState([] as GetOrderDto[]);

  const getUserOders = async () => {
    try {
      await OrderService.getUserOrders().then((res) => {
        setOrders(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserOders();
    useSetUser();
  }, []);

  return (
    <div>
      <div className={classes.profileContainer}>
        <div className={classes.profile}>
          <img src="avatar.png" style={{ height: "100px", width: "100px" }} />
          <div className={classes.info}>
            <label>Email: {user.email}</label>
            <label>Имя: {user.name}</label>
            <label>
              В вашей корзине товаров на сумму: {user.purchasedSets}
            </label>
            <label>Номер телефона: {user.phoneNumber}</label>
            {user.role === "ADMIN" ? (
              <Link
                to={"/admin-panel"}
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginTop: "10px",
                  marginLeft: "0px",
                }}
              >
                <label style={{ cursor: "pointer" }}> Админ панель</label>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <div className={classes.cart}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}> Заказы</h2>
          <OrderTable orders={orders} />
        </div>
      </div>
    </div>
  );
};
