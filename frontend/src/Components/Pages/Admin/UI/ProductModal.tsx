import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Button as MyButton } from "@/Components/UI/Button/Button";
import { useState } from "react";
import classes from "../styles/Admin.module.css";
import { config } from "../config";
import { showNotification } from "@/Components/UI";
import { ProductService } from "@/Components/service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";

const { productModalStyle, VisuallyHiddenInput } = config;

export const ProductModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>("");
  const [imageLinkList, setImageLinkList] = useState<string[]>([]);

  async function createProduct() {
    try {
      const product = {
        name,
        description,
        price,
        ProductImages: imageLinkList,
      };

      if (imageLinkList.length === 0) {
        showNotification("Добавьте изображение", false);
        return;
      } else if (!name || !description || !price) {
        showNotification("Заполните все поля", false);
        return;
      }
      await ProductService.createProduct(product as any).then(() => {
        showNotification("Товар успешно добавлен", true);
      });
    } catch (err) {
      showNotification("Ошибка при добавлении товара", false);
    }
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

  return (
    <>
      <div style={{ margin: "0px" }} className={classes.actionButtons}>
        <MyButton action={handleOpen}>Добавить продукт</MyButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={productModalStyle}>
          <h3>Добавить товар</h3>
          <div className={classes.modalField}>
            <input
              placeholder="Название"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
              rows={5}
              cols={50}
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <br />
            <input
              min={0}
              type="number"
              placeholder="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
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

            <MyButton action={createProduct}>Добавить продукт</MyButton>
          </div>
        </Box>
      </Modal>
    </>
  );
};
