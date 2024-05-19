import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Button } from "@/Components/UI/Button/Button";
import { FC, useState } from "react";
import classes from "../styles/Admin.module.css";
import { config } from "../config";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CouponService } from "@/Components/service/Coupon.service";
import { ToastContainer } from "react-toastify";
import { showNotification } from "@/Components/UI";

const { couponModalStyle } = config;

export const CouponModal: FC<{ getNewList: () => void }> = ({ getNewList }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dateHandler = (newDate: any) => {
    setDate(dayjs(newDate));
  };

  const discountHandler = (e: any) => {
    if (e.target.value < 1 || e.target.value > 100) return;
    setDiscount(e.target.value);
  };

  const quantityHandler = (e: any) => {
    if (e.target.value < 1) return;
    setQuantity(e.target.value);
  };

  const createCoupon = () => {
    try {
      CouponService.createCoupon({
        maxNumberOfActivations: +quantity,
        discountAmount: +discount,
        expirationDate: date.toISOString(),
      }).then(() => {
        showNotification("Купон создан", true);
        getNewList();
        setOpen(false);
        setQuantity(1);
        setDiscount(1);
        setDate(dayjs());
      });
    } catch (err) {
      showNotification("Произошла ошибка", false);
    }
  };

  return (
    <div>
      <Button action={handleOpen}>Создать купон</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={couponModalStyle}>
          <h3>Создать купон</h3>
          <div className={classes.couponModal}>
            <div className={classes.modalField}>
              <span> Количество активаций</span>
              <input
                type="number"
                value={quantity}
                onChange={quantityHandler}
                min={1}
              />
            </div>
            <div className={classes.modalField}>
              <span>Скидка, %</span>
              <input
                type="number"
                min={1}
                max={100}
                value={discount}
                onChange={discountHandler}
              />
            </div>
            <div className={classes.modalField}>
              <span>Дата истечения</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={dayjs()}
                  value={date}
                  onChange={(newDate) => dateHandler(newDate)}
                />
              </LocalizationProvider>
              <Button action={createCoupon}>Создать купон</Button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};
