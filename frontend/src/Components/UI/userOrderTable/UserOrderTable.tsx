import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { Table } from "reactstrap";
import { config } from "./config";
import { FC } from "react";
import { UserProductsDto } from "@/Components/service/dto";
import { Link } from "react-router-dom";

export const UserOrderTable: FC<{ products: UserProductsDto[] }> = ({
  products,
}) => {
  const { StyledTableCell, StyledTableRow } = config;

  return (
    <TableContainer component={Paper} style={{ textAlign: "left" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Наименование</StyledTableCell>
            <StyledTableCell align="left">Комментарий</StyledTableCell>
            <StyledTableCell align="left">Цена</StyledTableCell>
            <StyledTableCell align="center">Количество</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            ?.sort((a, b) => a.product.id - b.product.id)
            .map((el: UserProductsDto) => (
              <StyledTableRow key={el.product.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  <Link to={`/product/${el.product.id}`}>
                    <img
                      src={el.product.main_image}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Link>
                </StyledTableCell>

                <StyledTableCell align="left">
                  {el.product.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {el.product.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {el.product.price}Br
                </StyledTableCell>
                <StyledTableCell align="left">{el.count}</StyledTableCell>
              </StyledTableRow>
            ))}
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Итого:</StyledTableCell>
            <StyledTableCell align="left">
              {products?.reduce(
                (acc: number, el: UserProductsDto) =>
                  acc + el.product.price * el.count,
                0
              )}
              Br
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
