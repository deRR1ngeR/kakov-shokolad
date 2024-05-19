import { useEffect, useState } from "react";
import classes from "./styles/Admin.module.css";
import { ProductService } from "@services";

import { showNotification } from "@/Components/UI";
import Table from "@mui/material/Table";
import { Checkbox } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";

import { config } from "./config";
import { GetProductInterface } from "../Product/interfaces/get-product.interface";
import { Link } from "react-router-dom";
import { Button } from "@/Components/UI/Button/Button";
import { ProductModal } from "./UI/ProductModal";

const { StyledTableCell, StyledTableRow } = config;

export const AdminProduct = () => {
  const [productList, setProductList] = useState<GetProductInterface[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    ProductService.getAllProducts().then((res) => {
      const data: GetProductInterface[] = [];
      res.map((el: GetProductInterface) =>
        data.push({
          id: el.id,
          name: el.name,
          description: el.description,
          price: el.price,
          isActivated: el.isActivated,
          main_image: el.main_image,
          ProductImages: el.ProductImages,
          isChecked: false,
        })
      );
      setProductList(data);
    });
  }
 

  async function handleCheckedProducts(e: any, id: number) {
    const result = productList?.map((x) => {
      if (x.id === id) {
        x.isChecked = e.target.checked;
      }
      return x;
    });
    if (result) setProductList(result);
  }

  async function deleteSelectedProducts() {
    const selectedProducts = productList?.filter((x) => x.isChecked == true);
    if (selectedProducts.length > 0) {
      selectedProducts.map(async (product) => {
        ProductService.deleteProduct(product.id)
          .then(() => {
            showNotification("Товар успешно удален", true);
          })
          .catch((err) => {
            showNotification(err.response.data.message, false);
          });
      });
    } else if (selectedProducts.length === 0) {
      showNotification("Выберите хотя бы один продукт", false);
    }
  }

  const changeProductStatus = (value: boolean, id: number) => {
    let flag = "деактивирован";
    productList.map((x) => {
      if (x.id === id) {
        if (x.isActivated === false) flag = "активирован";
        x.isActivated = value;
      }
    });
    ProductService.changeProductStatus(id)
      .then((res) => {
        setProductList(res);
        showNotification(`Продукт ${flag}!`, true);
      })
      .catch(() => showNotification(`Ошибка операции`, false));
  };

  return (
    <div className={classes.adminProduct}>
      <div className={classes.actionButtons}>
        <ProductModal />
        <Button action={deleteSelectedProducts}>Удалить</Button>
      </div>
      <TableContainer component={Paper} style={{ textAlign: "left" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="left">Наименование</StyledTableCell>
              <StyledTableCell align="left">Активирован</StyledTableCell>
              <StyledTableCell align="left">Комментарий</StyledTableCell>
              <StyledTableCell align="left">Цена</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList &&
              productList
                .sort((a, b) => a.id - b.id)
                .map(
                  ({
                    id,
                    name,
                    description,
                    price,
                    main_image,
                    isChecked,
                    isActivated,
                  }) => (
                    <StyledTableRow key={id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Checkbox
                          checked={!!isChecked}
                          onChange={(e) => handleCheckedProducts(e, id)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{id}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Link to={`/product/${id}`}>
                          <img
                            src={main_image}
                            alt="product"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="left">{name}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Switch
                          checked={isActivated ? isActivated : false}
                          onChange={(e) =>
                            changeProductStatus(e.target.checked, id)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {description}
                      </StyledTableCell>
                      <StyledTableCell align="left">{price}</StyledTableCell>
                    </StyledTableRow>
                  )
                )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};
