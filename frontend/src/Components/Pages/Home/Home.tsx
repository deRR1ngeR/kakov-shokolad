import { useEffect, useState } from "react";
import classes from "./styles/Home.module.css";
import { PaginatedCatalog } from "./Components/Catalog";
import { ProductService } from "@services";
import { Link } from "react-router-dom";
import { GetProductInterface } from "../Product/interfaces/get-product.interface";
import { Button } from "@/Components/UI/Button/Button";

interface HomeProps {
  actual_main_image: string;
  text: string;
}

export const Home: React.FC<HomeProps> = ({ actual_main_image, text }) => {
  const [products, setProducts] = useState<GetProductInterface[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const page = 1;

  const getProducts = async () => {
    const prods = await ProductService.getAllProductForCatalogByPage(page, 6);
    setProducts(prods);
  };
  return (
    <div className={classes.container}>
      <div className={classes.topDiv}>
        <img src={actual_main_image} />
        <h1 className="text-4xl font-bold"> {text}</h1>
      </div>

      <div className={classes.catalog_section}>
        <h2> Наборы конфет </h2>

        <PaginatedCatalog products={products} />
        <Link to={"/catalog/1"}>
          <Button>Посмотреть все</Button>
        </Link>
      </div>
    </div>
  );
};
