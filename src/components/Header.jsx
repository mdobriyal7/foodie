import React from "react";

const Header = ({ category, title }) => (
  <div className="mb-5">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-bold tracking-tight text-slate-900">{title}</p>
  </div>
);

export default Header;
