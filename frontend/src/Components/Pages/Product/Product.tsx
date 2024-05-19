import { CartService } from "@services";
import { ProductProps } from "./interfaces/product-props.interface";
import classes from "./styles/Product.module.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductService } from "@services";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { showNotification } from "@components/UI";
import { useGetUser } from "@hooks";
import { GetProductInterface } from "./interfaces/get-product.interface";
import { Carousel } from "antd";
import { config } from "./config";

export const Product: React.FC<ProductProps> = ({ id }) => {
  const { VisuallyHiddenInput } = config;

  const [user, setUser] = useState({} as any);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [editDescription, setEditDescription] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [imageLinkList, setImageLinkList] = useState<string[]>([]);

  useEffect(() => {
    getProduct(id);
    setUser(useGetUser());
  }, []);
  const [product, setProduct] = useState<GetProductInterface>();

  const [description, setDescription] = useState("");

  async function getProduct(id: number) {
    await ProductService.getProductById(id).then((res) => {
      setProduct(res);
    });
  }

  async function uploadImages(e: any) {
    try {
      if (e.target.files) {
        const fd = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
          fd.append(`file`, e.target.files[i]);
        }
        await ProductService.UploadImages(fd).then((res) => {
          setImageLinkList(res);
          showNotification("Изображения успешно загружены", true);
        });
      }
    } catch (err) {
      showNotification("Произошла ошибка при загрузке изображений", false);
    }
  }

  async function addProductToCart() {
    try {
      await CartService.addOrUpdateProductToCart({
        userId: user.id,
        productId: id,
        count: 1,
        description,
      }).then(() => showNotification("Корзина обновлена!", true));
    } catch (err: any) {
      showNotification("Произошла ошибка!", false);
    }
  }

  async function deleteProduct() {
    if (product)
      try {
        await ProductService.deleteProduct(product.id).then(() => {
          showNotification("Корзина обновлена!", true);
          window.location.reload();
        });
      } catch (err: any) {
        showNotification("Произошла ошибка!", false);
      }
  }

  async function editProductHandler() {
    const editProduct = {
      name: name ? name : product?.name,
      description: editDescription ? editDescription : product?.description,
      price: price ? price : product?.price,
      ProductImages: imageLinkList,
    };
    if (product) {
      try {
        await ProductService.editProduct(product.id, editProduct as any).then(
          (res) => {
            showNotification("Товар обновлён!", true);
            setEditMode(!editMode);
            setProduct(res.data);
          }
        );
      } catch (err) {
        showNotification("Произошла ошибка!", false);
      }
    }
  }

  return (
    <>
      {user.role == "ADMIN" ? (
        <div
          style={{ display: "flex", width: "550px", justifyContent: "center" }}
        >
          <button
            className={classes.show_all_btn}
            onClick={() => setEditMode(!editMode)}
          >
            Изменить товар{" "}
          </button>
          <button className={classes.show_all_btn} onClick={deleteProduct}>
            Удалить товар{" "}
          </button>
        </div>
      ) : (
        <></>
      )}
      {!editMode ? (
        <div className={classes.productContainer}>
          <div className={classes.productCard}>
            <Carousel style={{ width: "500px" }}>
              {product?.ProductImages?.map((image) => (
                <div key={image.id}>
                  <img
                    className={classes.productImage}
                    src={image.productImage}
                    alt="image"
                  />
                </div>
              ))}
            </Carousel>
            <div className={classes.productInfo}>
              <h1>{product?.name}</h1>
              <h3>{`${product?.price}Br`}</h3>
              <p> {product?.description} </p>
              <textarea
                rows={5}
                cols={50}
                placeholder=" Введите сюда ваши пожелания :)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                className={classes.show_all_btn}
                onClick={addProductToCart}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.changeProduct} style={{ marginTop: "50px" }}>
            <input
              type="text"
              placeholder="Наименование"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              rows={5}
              cols={50}
              placeholder=" Описание"
              style={{ minWidth: "250px", minHeight: "45px" }}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "35%  ",
            }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={uploadImages}
              />
            </Button>
            <button
              className={classes.show_all_btn}
              style={{ left: "250px" }}
              onClick={editProductHandler}
            >
              Сохранить
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
