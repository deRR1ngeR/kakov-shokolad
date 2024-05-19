import { MouseEventHandler } from "react";
import classes from "./Button.module.css";

export const Button = ({
  style,
  children,
  action,
}: {
  children: any;
  action?: MouseEventHandler<HTMLButtonElement>;
  style?: any;
}) => {
  return (
    <button
      style={{ ...style }}
      className={classes.show_all_btn}
      type="button"
      onClick={action}
    >
      {children}
    </button>
  );
};
