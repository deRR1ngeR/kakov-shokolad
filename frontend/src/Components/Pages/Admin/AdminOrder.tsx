import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SvgIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { ToastContainer } from "react-toastify";
import { GetOrderDto } from "../../service/dto/order/getOrder.dto";
import { OrderService } from "@services";
import { showNotification } from "@/Components/UI";
import { config } from "./config";
import { ModalOrderDetails } from "@/Components/UI/userOrderTable/ModalOrderDetails";

export const AdminOrders = () => {
  const { StyledTableCell, StyledTableRow } = config;

  const [orders, setOrders] = useState<GetOrderDto[]>([]);

  const getAllOrders = async function () {
    await OrderService.getAllOrders().then((res) => {
      setOrders(res);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  async function deleteOrder(id: number) {
    if (window.confirm("Вы уверены, что хотите удалить заказ?"))
      try {
        await OrderService.deleteOrder(id).then((res) => {
          setOrders(res);
          showNotification(`Заказ удален!`, true);
        });
      } catch (err) {
        showNotification(`Ошибка операции`, false);
      }
  }

  const acceptOrder = async (value: boolean, id: number) => {
    try {
      let flag = "отказан";
      orders.map((x) => {
        if (x.id === id) {
          if (x.orderStatus === false) flag = "принят";
          x.orderStatus = value;
        }
        return x;
      });
      await OrderService.changeStatusOrder(id).then((res) => {
        setOrders(res);
        showNotification(`Заказ ${flag}!`, true);
      });
    } catch (err) {
      showNotification(`Ошибка операции`, false);
    }
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ textAlign: "left" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">id</StyledTableCell>
              <StyledTableCell align="left">
                Дата создания заказа
              </StyledTableCell>
              <StyledTableCell align="left">
                Дата получения заказа
              </StyledTableCell>
              <StyledTableCell align="left">Способ доставки</StyledTableCell>
              <StyledTableCell align="left">Статус заказа</StyledTableCell>
              <StyledTableCell align="left">Адрес</StyledTableCell>
              <StyledTableCell align="left"> Стоимость заказа</StyledTableCell>
              <StyledTableCell align="left">комментарий</StyledTableCell>
              <StyledTableCell align="left">пользователь</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .sort((a, b) => a.id - b.id)
              .map((el) => (
                <StyledTableRow key={el.id}>
                  <StyledTableCell align="left">{el.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {el.creationDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {el.dateOfOrder}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {el.deliveryMethod}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Switch
                      checked={el.orderStatus}
                      onChange={(e) => acceptOrder(e.target.checked, el.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{el.adress}</StyledTableCell>
                  <StyledTableCell align="left">
                    {el.totalAmount}
                  </StyledTableCell>
                  <StyledTableCell align="left">{el.comment}</StyledTableCell>
                  <StyledTableCell align="center">
                    {el.user.name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <div onClick={() => deleteOrder(el.id)}>
                      <SvgIcon>
                        <SvgIcon component={DeleteIcon} inheritViewBox />
                      </SvgIcon>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <ModalOrderDetails order={el} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            <StyledTableRow key={"total"}>
              <StyledTableCell align="left">Всего заказов:</StyledTableCell>
              <StyledTableCell align="left">{orders.length}</StyledTableCell>
              <StyledTableCell align="left">Принято:</StyledTableCell>
              <StyledTableCell align="left">
                {orders.reduce((acc, el) => acc + Number(el.orderStatus), 0)}
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};
