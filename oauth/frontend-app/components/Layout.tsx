import React from "react";

const Logo = () => (
  <img
    src="https://dashboard.kusk.io/static/media/KuskLogo.2ce793db05884c7fae220394f72d79bf.svg"
    className="inline"
    style={{
      maxWidth: "50px",
      maxHeight: "50px",
    }}
  />
);

const Header = () => {
  return (
    <header className="bg-black p-3">
      <div className="flex justify-between ml-2 mr-10">
        <a href="/" className="flex text-xl font-bold text-black">
          <Logo />
        </a>
        <nav className="space-x-8 text-white text-xl">
          <a href="/oauth2/signout">Logout</a>
        </nav>
      </div>
    </header>
  );
};

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold p-5">Kusk OAuth Demo</h1>
      <div className="p-5">{children}</div>
    </div>
  );
};
