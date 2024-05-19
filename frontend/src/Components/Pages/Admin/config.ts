import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

export const config: any = {
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
  VisuallyHiddenInput: styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  }),

  couponModalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    height: "400px",
    transform: "translate(-50%, -50%)",
    width: "700px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  productModalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    height: "550px",
    transform: "translate(-50%, -50%)",
    width: "700px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
};
