import { useEffect, useState } from "react";
import { ProductService } from "@services";
import { PaginatedCatalog } from "../Home/Components/Catalog";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem/PaginationItem";
import { Search } from "./UI/Search";
import { GetProductInterface } from "../Product/interfaces/get-product.interface";

export const Catalog: React.FC<{ currentPage: number }> = ({ currentPage }) => {
  const [products, setProducts] = useState<GetProductInterface[]>([]);
  const [pages, setPages] = useState<number>(0);

  const getCatalog = async () => {
    await ProductService.getCatalog().then((res) => {
      setPages(Math.ceil(res.length / 9));
      getProducts(currentPage);
    });
  };

  useEffect(() => {
    getCatalog();
  }, [currentPage]);

  useEffect(() => {}, [pages]);

  const getProducts = async (page: number) => {
    await ProductService.getAllProductForCatalogByPage(page,9).then((res) =>
      setProducts(res)
    );
  };

  const handleSearch = (search: string) => {
    ProductService.searchProducts(1, search).then((x) => {
      setProducts(x);
      setPages(Math.ceil(x.length / 9));
    });
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />

      <PaginatedCatalog products={products} />

      <Pagination
        style={{ width: "350px" }}
        onClick={() => getProducts(currentPage)}
        page={currentPage}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            key={item.page}
            component={Link}
            to={`/catalog/${item.page === 1 ? "1" : `${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
};
