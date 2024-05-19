import { CartTable } from "./UI/CartTable";
import classes from "./styles/Cart.module.css";

export const Cart = () => {
  return (
    <div className={classes.cart}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}> Корзина</h2>
      <CartTable />
    </div>
  );
};
