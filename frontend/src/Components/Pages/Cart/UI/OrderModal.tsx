import Box from "@mui/material/Box";
import classes from "../styles/Cart.module.css";

import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Modal from "@mui/material/Modal";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import dayjs from "dayjs";
import { Button } from "@/Components/UI/Button/Button";
import { showNotification } from "@/Components/UI";
import { OrderService } from "@/Components/service";
import { CreateOrderDto, UserProductsDto } from "@/Components/service/dto";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/App";
import { User } from "@/interfaces/user.interface";
import { ToastContainer } from "react-toastify";
import { config } from "./config";
import { CouponService } from "@/Components/service/Coupon.service";

const { modalStyle } = config;

export const OrderModal: React.FC<{
  orderedProducts: UserProductsDto[];
}> = ({ orderedProducts }) => {
  const user: User = useContext(UserContext);

  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [orderDate, setOrderDate] = useState(dayjs());
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [selectedOption, setSelectedOption] = useState<"PICKUP" | "DELIVERY">(
    "PICKUP"
  );
  const [adress, setAdress] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTotalPrice(
      orderedProducts.reduce(
        (acc: number, el: UserProductsDto) =>
          Number(acc) + Number(el.product.price) * Number(el.count),
        0
      )
    );
  }, [orderedProducts]);

  const handleOpen = () => {
    if (orderedProducts.length == 0) {
      showNotification("Выберите хотя бы один товар", false);
    } else setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const dateHandler = (el: any) => {
    setOrderDate(dayjs(el));
  };

  const createOrder = async () => {
    const order: CreateOrderDto = {
      userId: user.id,
      dateOfOrder: orderDate.toDate(),
      comment: comment,
      totalAmount: discount
        ? Number((totalPrice * discount).toFixed(2))
        : totalPrice,
      deliveryMethod: selectedOption,
      products: orderedProducts.map((el) => {
        return {
          productId: el.product.id,
          count: el.count,
          description: el.description,
        };
      }),
      adress: adress,
    };
    CouponService.activateCoupon(coupon)
      .then(() => OrderService.createOrder(order))
      .then(() => {
        showNotification("Заказ оформлен!", true);
        navigate("/profile");
      })
      .catch(() => {
        showNotification("Произошла ошибка!", false);
      });
  };

  const isCouponExist = () => {
    if (coupon.length < 7) {
      showNotification("Неверный купон!", false);
      setCoupon("");
      setDiscount(0);
    } else
      CouponService.getCouponByCode(coupon)
        .then((el) => {
          setDiscount(1 - el.discountAmount / 100);
          showNotification("Купон применен!", true);
        })
        .catch(() => {
          setCoupon("");
          setDiscount(0);
          showNotification("Неверный купон!", false);
        });
  };

  return (
    <div>
      <Button action={handleOpen}>Оформить заказ</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={classes.modalContainer}>
            <div style={{ marginLeft: "55px" }}>
              <label style={{ paddingRight: "58px" }}>Выберите дату</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={dayjs()}
                  value={orderDate}
                  onChange={(newValue) => dateHandler(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "250px" }}>
              <select
                onChange={(e) =>
                  setSelectedOption(e.target.value as "PICKUP" | "DELIVERY")
                }
              >
                <option value={""}>Выберите способ доставки</option>
                <option value={"PICKUP"}>Самовывоз</option>
                <option value={"DELIVERY"}>Доставка</option>
              </select>
              {selectedOption === "DELIVERY" ? (
                <input
                  type="text"
                  placeholder="Укажите адрес"
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
              ) : (
                <></>
              )}
            </div>
            <div style={{ marginLeft: "53px" }}>
              Оставьте комментарий
              <textarea
                style={{
                  width: "283px",
                  maxWidth: "283px",
                  maxHeight: "100px",
                }}
                rows={5}
                cols={35}
                placeholder=" Введите сюда ваши пожелания :)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className={classes.coupon} style={{ marginLeft: "55px" }}>
              <label> Промокод:</label>
              <input
                style={{ marginLeft: "90px" }}
                type="text"
                value={coupon}
                maxLength={7}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button action={isCouponExist}>Применить</Button>
              <label
                style={discount ? { color: "green" } : { display: "none" }}
              >
                Скидка {100 - discount * 100}%
              </label>
            </div>
            <div style={{ marginLeft: "55px" }}>
              Общая стоимость заказа:
              {discount ? (totalPrice * discount).toFixed(2) : totalPrice}Br
            </div>
          </div>
          <div>
            <Button action={createOrder}>Сделать заказ</Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};
