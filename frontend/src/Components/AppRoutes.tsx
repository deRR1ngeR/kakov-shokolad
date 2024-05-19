import { Routes, Route } from "react-router-dom";
import {
  About,
  Admin,
  Branding,
  Cart,
  Catalog,
  Contact,
  Home,
  Login,
  Product,
  Profile,
  Register,
} from "@pages";
import { useEffect, useState } from "react";
import { ProductService } from "./service/Product.service";
import { User } from "../interfaces/user.interface";
import { useGetUser } from "@hooks";
import { AdminOrders } from "./Pages/Admin/AdminOrder";
import { AdminProduct } from "./Pages/Admin/AdminProduct";
import { AdminUsers } from "./Pages/Admin/AdminUsers";
import { AdminCoupons } from "./Pages/Admin/AdminCoupons";
import { GetProductInterface } from "./Pages/Product/interfaces/get-product.interface";

export const AppRoutes = () => {
  const img = "../../public/photo_2023-12-01_15-07-27.jpg";
  const text = "Только самый вкусный шоколад ручной работы";

  const [products, setProducts] = useState<GetProductInterface[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
        setPages(
          Array.from(
            { length: Math.ceil(data.length / 9) },
            (_, index) => index + 1
          )
        );
        setUser(useGetUser());
      })
      .catch((error) => {
        console.error("Error loading products: ", error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home actual_main_image={img} text={text} />} />
      {products.map((prod) => (
        <Route
          key={prod.id}
          path={`/product/${prod.id}`}
          element={<Product id={prod.id} />}
        />
      ))}

      {pages.map((page) => (
        <Route
          key={page}
          path={`/catalog/${page}`}
          element={<Catalog currentPage={page} />}
        />
      ))}
      <Route path="/branding" element={<Branding />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      {user.role === "ADMIN" ? (
        <>
          <Route path="/admin-panel" element={<Admin />} />
          <Route path="/admin-panel/coupons" element={<AdminCoupons />} />
          <Route path="/admin-panel/product" element={<AdminProduct />} />
          <Route path="admin-panel/users" element={<AdminUsers />} />
          <Route path="admin-panel/orders" element={<AdminOrders />} />
        </>
      ) : (
        <></>
      )}
    </Routes>
  );
};
