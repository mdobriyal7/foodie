import React from "react";
import { RiMenu2Line, RiFileAddLine, RiChat2Line } from "react-icons/ri";

const links = [
  {
    title: "Menu",
    links: [
      {
        name: "Menu",
        icon: <RiMenu2Line />,
      },
      {
        name: "Add Dish",
        icon: <RiFileAddLine />,
      },
      
    ],
  },
  {
    title: "Order",
    links: [
      {
        name: "Order Summary",
        icon: <RiChat2Line />,
      },
    ],
  },
];

export default links;
