import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserProductsDto } from "@services/dto";
import { Checkbox, SvgIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartService } from "@services";
import { config } from "./config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App";
import { User } from "src/interfaces/user.interface";
import { OrderModal } from "./OrderModal";
import { Link } from "react-router-dom";

export const CartTable = () => {
  const { StyledTableCell, StyledTableRow } = config;

  const user: User = useContext(UserContext);
  const [userProducts, setUserProducts] = useState<UserProductsDto[]>();

  useEffect(() => {
    getCart(user.id);
  }, []);

  const getCart = async (id: number) => {
    await CartService.getCart(id).then((res) => {
      const data: UserProductsDto[] = [];
      res.map((el: UserProductsDto) =>
        data.push({
          product: el.product,
          count: el.count,
          description: el.description,
          isChecked: false,
        })
      );
      setUserProducts(data);
    });
  };

  useEffect(() => {
    calculateTotalCount();
  }, [userProducts]);

  function calculateTotalCount() {
    if (userProducts) {
      const res = userProducts.reduce(
        (acc: number, el: UserProductsDto) => Number(acc) + Number(el.count),
        0
      );
      return res;
    }
    return 0;
  }

  async function productToCartUpdate(cartItem: UserProductsDto) {
    await CartService.addOrUpdateProductToCart({
      userId: user.id,
      productId: cartItem.product.id,
      count: cartItem.count,
      description: cartItem.description,
    });
  }

  const handleChangeCount = (e: any, id: number) => {
    const result = userProducts?.map((x) => {
      if (x.product.id === id) {
        x.count = e.target.value;
        if (x.count <= 0) x.count = 1;
      }
      return x;
    });
    if (result) setUserProducts(result);
  };

  const handleCheckedProducts = (e: any, id: number) => {
    const result = userProducts?.map((x) => {
      if (x.product.id === id) {
        x.isChecked = e.target.checked;
      }
      return x;
    });
    if (result) setUserProducts(result);
  };

  async function deleteItem(item: UserProductsDto) {
    await CartService.deleteProductFromCart({
      userId: user.id,
      productId: item.product.id,
    }).then((res) => {
      const data: UserProductsDto[] = [];
      res.map((el: UserProductsDto) =>
        data.push({
          product: el.product,
          count: el.count,
          description: el.description,
          isChecked: false,
        })
      );
      setUserProducts(data);
    });
  }

  return (
    <TableContainer component={Paper} style={{ textAlign: "left" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Наименование</StyledTableCell>
            <StyledTableCell align="left">Комментарий</StyledTableCell>
            <StyledTableCell align="left">Цена</StyledTableCell>
            <StyledTableCell align="center">Количество</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userProducts
            ?.sort((a, b) => a.product.id - b.product.id)
            .map((el: UserProductsDto) => (
              <StyledTableRow key={el.product.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  <Checkbox
                    checked={el.isChecked}
                    onChange={(e) => handleCheckedProducts(e, el.product.id)}
                  />
                </StyledTableCell>
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
                <StyledTableCell align="left">{el.description}</StyledTableCell>
                <StyledTableCell align="left">
                  {el.product.price}Br
                </StyledTableCell>
                <StyledTableCell align="center">
                  <form>
                    <input
                      id={el.product.id.toString()}
                      min={1}
                      max={99}
                      type="number"
                      onBlur={() => productToCartUpdate(el)}
                      value={el.count}
                      onChange={(e) => handleChangeCount(e, el.product.id)}
                    />
                  </form>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <div onClick={() => deleteItem(el)}>
                    <SvgIcon>
                      <SvgIcon component={DeleteIcon} inheritViewBox />
                    </SvgIcon>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          <StyledTableRow key={"total"}>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Итого</StyledTableCell>
            <StyledTableCell align="left">
              {userProducts?.reduce(
                (acc: number, el: UserProductsDto) =>
                  acc + el.product.price * el.count,
                0
              )}
              Br
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              <OrderModal
                orderedProducts={userProducts?.filter((x) => x.isChecked) || []}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
