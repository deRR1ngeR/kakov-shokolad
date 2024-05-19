import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SvgIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { UserService } from "@services";
import Switch from "@mui/material/Switch";
import { User } from "../../../interfaces/user.interface";
import { ToastContainer } from "react-toastify";
import { showNotification } from "@/Components/UI";
import { config } from "./config";

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { StyledTableCell, StyledTableRow } = config;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      await UserService.findAllUsers().then((res) => {
        setUsers(res);
      });
    } catch (err) {
      showNotification(`Ошибка операции`, false);
    }
  }

  async function deleteUser(id: number) {
    try {
      if (window.confirm("Вы уверены, что хотите удалить пользователя?"))
        await UserService.deleteUser(id).then(() => fetchUsers());
    } catch (err) {
      showNotification(`Ошибка операции`, false);
    }
  }

  const blockHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    users.map((x) => {
      if (x.id === id && x.role !== "ADMIN") {
        let flag = "разблокирован";
        if (x.isBlocked === false) flag = "заблокирован";
        x.isBlocked = event.target.checked;
        UserService.blockUser(id).then(() => {
          fetchUsers();
          showNotification(`Пользователь ${flag}!`, true);
        });
      } else if (x.id === id && x.role === "ADMIN") {
        showNotification(
          'Ошибка! Невозможно заблокировать пользователя с ролью "Админ"',
          false
        );
      }
      return x;
    });
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ textAlign: "left" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">id</StyledTableCell>
              <StyledTableCell align="left">Имя</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">
                Товаров в корзине, Br
              </StyledTableCell>
              <StyledTableCell align="left"> Номер телефона</StyledTableCell>
              <StyledTableCell align="left"> Статус блокировки</StyledTableCell>
              <StyledTableCell align="left"> Роль</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .sort((a, b) => a.id - b.id)
              .map((el) => (
                <StyledTableRow key={el.id}>
                  <StyledTableCell align="left">{el.id}</StyledTableCell>
                  <StyledTableCell align="left">{el.name}</StyledTableCell>
                  <StyledTableCell align="left">{el.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {el.purchasedSets}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {el.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Switch
                      checked={el.isBlocked}
                      onChange={(e) => blockHandler(e, el.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{el.role}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div onClick={() => deleteUser(el.id)}>
                      <SvgIcon>
                        <SvgIcon component={DeleteIcon} inheritViewBox />
                      </SvgIcon>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            <StyledTableRow key={"total"}>
              <StyledTableCell align="left">
                Всего пользователей:
              </StyledTableCell>
              <StyledTableCell align="left">{users.length}</StyledTableCell>
              <StyledTableCell align="left">Заблокировано:</StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                {users.reduce((acc, el) => acc + Number(el.isBlocked), 0)}
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
