import { FC, memo } from "react";
import classes from "../styles/Home.module.css";
import {
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import { CatalogProps } from "../interfaces/catalog-props.interface";
import { Link } from "react-router-dom";

export const PaginatedCatalog: FC<CatalogProps> = memo(({ products }) => {
  return (
    <div className={classes.product}>
      <CardGroup className={classes.cardGroup}>
        {products.map((prod) => (
          <Card key={prod.id} className={classes.card}>
            <Link to={`/product/${prod.id}`}>
              <CardImg
                alt={prod.name}
                src={prod.main_image}
                className={classes.cardImg}
                top
                width="100%"
                style={{ aspectRatio: 1, cursor: "pointer" }}
              />
            </Link>

            <CardBody>
              <CardTitle
                tag="h2"
                style={{ textAlign: "center", color: "#CDB566" }}
              >
                {prod.name}
              </CardTitle>
              <CardSubtitle
                style={{
                  textAlign: "center",
                  fontSize: "100%",
                  color: "#f0c96a",
                }}
                className="mb-2 text-muted"
                tag="h4"
              >
                {prod.price}Br
              </CardSubtitle>
            </CardBody>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
});
