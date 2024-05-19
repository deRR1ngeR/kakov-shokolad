import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetOrderDto } from "@services/dto";
import { config } from "./config";
import { ModalOrderDetails } from "@/Components/UI/userOrderTable/ModalOrderDetails";

export const OrderTable: React.FC<{ orders: GetOrderDto[] }> = ({ orders }) => {
  const { StyledTableCell, StyledTableRow } = config;
  return (
    <TableContainer component={Paper} style={{ textAlign: "left" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Дата заказа</StyledTableCell>
            <StyledTableCell align="left">Способ доставки</StyledTableCell>
            <StyledTableCell align="left">Статус заказа</StyledTableCell>
            <StyledTableCell align="left"> Адрес</StyledTableCell>
            <StyledTableCell align="center">Стоимость</StyledTableCell>
            <StyledTableCell align="left">Комментарий</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: GetOrderDto) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell
                component="th"
                scope="row"
                align="center"
              ></StyledTableCell>
              <StyledTableCell align="left">
                {order.dateOfOrder}
              </StyledTableCell>
              <StyledTableCell align="left">
                {order.deliveryMethod}
              </StyledTableCell>
              <StyledTableCell align="left">
                {order.orderStatus ? "Принят" : "На рассмотрении"}
              </StyledTableCell>
              <StyledTableCell align="left">{order.adress}</StyledTableCell>
              <StyledTableCell align="center">
                {order.totalAmount}
              </StyledTableCell>
              <StyledTableCell align="center">{order.comment}</StyledTableCell>
              <StyledTableCell>
                <ModalOrderDetails order={order} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
