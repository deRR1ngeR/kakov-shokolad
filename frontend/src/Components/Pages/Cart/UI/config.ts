import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const config = {
  StyledTableCell: styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  })),

  StyledTableRow: styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  })),
  modalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    height: "480px",
    transform: "translate(-50%, -50%)",
    width: "700px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};
