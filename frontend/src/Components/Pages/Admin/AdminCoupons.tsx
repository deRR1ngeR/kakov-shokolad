import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CouponService } from "@/Components/service/Coupon.service";
import { config } from "./config";
import { GetCouponDto } from "@/Components/service/dto/coupon/getCoupon.dto";
import { useEffect, useState } from "react";
import { CouponModal } from "./UI/CouponModal";
import Switch from "@mui/material/Switch";
import { SvgIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { showNotification } from "@/Components/UI";
import classes from "./styles/Admin.module.css";

export const AdminCoupons = () => {
  const { StyledTableCell, StyledTableRow } = config;

  const [couponsList, setCouponsList] = useState<GetCouponDto[]>([]);

  useEffect(() => {
    getCouponsList();
  }, []);

  const getCouponsList = () => {
    return CouponService.getAllCoupons().then((res) => {
      setCouponsList(res);
    });
  };

  const deleteCoupon = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить купон?"))
      try {
        CouponService.deleteCoupon(id).then((res) => {
          setCouponsList(res);
          showNotification(`Купон удален!`, true);
        });
      } catch (err) {
        showNotification(`Ошибка операции`, false);
      }
  };

  const changeCouponStatus = (value: boolean, id: number) => {
    try {
      let flag = "деактивирован";
      couponsList.map((x) => {
        if (x.id === id) {
          if (x.isActive === false) flag = "активирован";
          x.isActive = value;
        }
      });
      CouponService.changeCouponStatus(id).then((res) => {
        setCouponsList(res);
        showNotification(`Купон ${flag}!`, true);
      });
    } catch (err) {
      showNotification(`Ошибка операции`, false);
    }
  };

  return (
    <div>
      <div className={classes.actionButtons}>
        <CouponModal getNewList={getCouponsList} />
      </div>
      <TableContainer style={{ textAlign: "left" }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Купон</StyledTableCell>
              <StyledTableCell align="center">Активирован раз</StyledTableCell>
              <StyledTableCell align="center">Активирован</StyledTableCell>
              <StyledTableCell align="center"> Скидка, %</StyledTableCell>
              <StyledTableCell align="center"> Истекает</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {couponsList &&
              couponsList.map(
                ({
                  maxNumberOfActivations,
                  numberOfActivations,
                  discountAmount,
                  expirationDate,
                  code,
                  isActive,
                  id,
                }) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell align="center">{code}</StyledTableCell>
                    <StyledTableCell align="center">{`${numberOfActivations} / ${maxNumberOfActivations}`}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Switch
                        checked={isActive}
                        onChange={(e) =>
                          changeCouponStatus(e.target.checked, id)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {discountAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(expirationDate).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div onClick={() => deleteCoupon(id)}>
                        <SvgIcon>
                          <SvgIcon component={DeleteIcon} inheritViewBox />
                        </SvgIcon>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
