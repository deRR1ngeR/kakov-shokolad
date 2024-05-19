import axios from "axios";
import { CreateProductDto } from "./dto/product/create-product.dto";
import { UpdateProductDto } from "./dto/product/updateProduct.dto";
import { SERVER_URL } from "@constants";
import { GetProductInterface } from "../Pages/Product/interfaces/get-product.interface";

export class ProductService {
  static async getProductById(id: number): Promise<GetProductInterface> {
    const response = await axios.get(`${SERVER_URL}/api/product/${id}`);
    return response.data;
  }

  static async getAllProductForCatalogByPage(
    page: number,
    size: number
  ): Promise<GetProductInterface[]> {
    const response = await axios.get(
      `${SERVER_URL}/api/product?page=${page}&size=${size}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }

  static async getAllProducts(): Promise<GetProductInterface[]> {
    const response = await axios.get(`${SERVER_URL}/api/product/all`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async getCatalog(): Promise<GetProductInterface[]> {
    const response = await axios.get(`${SERVER_URL}/api/product/allActivated`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async createProduct(data: CreateProductDto) {
    await axios.post(
      `${SERVER_URL}/api/product`,
      {
        ...data,
      },
      { withCredentials: true }
    );
  }

  static async searchProducts(
    page: number,
    name: string
  ): Promise<GetProductInterface[]> {
    const response = await axios.get(
      `${SERVER_URL}/api/product?page=${page}&name=${name}`
    );
    return response.data.data;
  }

  static async deleteProduct(id: number) {
    return await axios.delete(`${SERVER_URL}/api/product/${id}`, {
      withCredentials: true,
    });
  }

  static async editProduct(id: number, body: UpdateProductDto) {
    console.log(body);
    return await axios.patch(
      `${SERVER_URL}/api/product/` + id,
      {
        ...body,
        ProductImages: body.ProductImages ? body.ProductImages : [],
      },
      { withCredentials: true }
    );
  }

  static async changeProductStatus(id: number): Promise<GetProductInterface[]> {
    return (
      await axios.patch(
        `${SERVER_URL}/api/product/status/${id}`,
        { data: null },
        { withCredentials: true }
      )
    ).data;
  }

  static async UploadImages(data: FormData): Promise<string[]> {
    return (
      await axios.post(`${SERVER_URL}/api/upload`, data, {
        withCredentials: true,
      })
    ).data;
  }
}
