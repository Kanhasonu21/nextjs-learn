import Link from "next/link";
import React from "react";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

const NavbarComponent = () => {
  return (
    <Navbar fluid  className="p-6"> 
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NextJS Todo App</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="/about" className="poin">
          About
        </NavbarLink>
        <NavbarLink as={Link}  href="/dashboard">Dashboard</NavbarLink>
        <NavbarLink  as={Link} href="/about">About Us</NavbarLink>
        <NavbarLink as={Link} href="/login">Login</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
