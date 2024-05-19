import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIcon } from "@mui/material";

export const Search: React.FC<{ handleSearch: Function }> = ({
  handleSearch,
}) => {
  const [search, setSearch] = useState("");
  const searchProduct = (search: string) => {
    setSearch(search);
  };

  return (
    <div style={{ width: "350px", marginTop: "25px", position: "relative" }}>
      <div
        onClick={() => handleSearch(search)}
        style={{
          position: "absolute",
          top: "10px",
          left: "315px",
          cursor: "pointer",
        }}
      >
        <SvgIcon>
          <SvgIcon component={SearchIcon} inheritViewBox />
        </SvgIcon>
      </div>
      <input
        placeholder="Поиск"
        value={search}
        onChange={(e) => searchProduct(e.target.value)}
      />
    </div>
  );
};
