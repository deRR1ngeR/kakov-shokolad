import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import { GetOrderDto } from "../../service/dto/order/getOrder.dto";
import { SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@components/UI/Button/Button";
import { UserOrderTable } from "./UserOrderTable";

export const ModalOrderDetails: React.FC<{ order: GetOrderDto }> = ({
  order,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {});

  return (
    <div>
      <Button action={handleOpen}>См. заказ</Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ overflowY: "scroll" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <h2 style={{ textAlign: "center" }}> Информация о заказе</h2>
          <div onClick={handleClose}>
            <SvgIcon style={{ float: "right", cursor: "pointer" }}>
              <SvgIcon component={CloseIcon} inheritViewBox />
            </SvgIcon>
          </div>
          <UserOrderTable products={order.product} />
        </div>
      </Modal>
    </div>
  );
};
