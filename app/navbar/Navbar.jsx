import Link from "next/link";
import React from "react";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

const NavbarComponent = () => {
  return (
    <Navbar fluid  className="p-6  w-full"> 
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NextJS Todo App</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
      <NavbarLink as={Link}  href="/dashboard" className="cursor-pointer">Dashboard</NavbarLink>

        <NavbarLink as={Link} href="/about" className="cursor-pointer">
          About
        </NavbarLink>
        <NavbarLink  as={Link} href="/about" className="cursor-pointer">About Us</NavbarLink>
        <NavbarLink as={Link} href="/login" className="cursor-pointer"ß>Login</NavbarLink>
        <NavbarLink as={Link} href="/signup" className="cursor-pointer"ß>Register</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
