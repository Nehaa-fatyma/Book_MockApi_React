import { NavLink } from "react-router-dom";

export const Header = () => {
  const menuList = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Services", url: "/services" },
    { name: "Books", url: "/books"}
    
  ];

  return (
    <nav>
      <ul>
        {menuList.map((item, index) => (
          <li key={index}>
            <NavLink to={item.url}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
