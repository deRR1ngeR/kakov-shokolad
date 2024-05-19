import { LogoItem, MenuItem } from ".";

export const config: {
  menuItems: MenuItem[];
  logoItem: LogoItem;
} = {
  menuItems: [
    {
      title: "Каталог",
      link: "/catalog",
    },
    {
      title: "Брендирование",
      link: "/branding",
    },
    {
      title: "О нас",
      link: "/about",
    },
    {
      title: "Контакты",
      link: "contacts",
    },
  ],
  logoItem: {
    title: "Главная",
    link: "/",
    imagePath: "logo.png",
  },
};
