"use client";
import Link from "next/link";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";

import { useSession, signOut } from "next-auth/react";

const NavbarComponent = () => {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <Navbar fluid className="p-6  w-full">
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NextJS Todo App
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {session ? (
          <>
            <NavbarLink as={Link} href="/dashboard" className="cursor-pointer">
              Dashboard
            </NavbarLink>
            <NavbarLink as={Link} href="/about" className="cursor-pointer">
              About
            </NavbarLink>
            <NavbarLink as={Link} href="/about" className="cursor-pointer">
              About Us
            </NavbarLink>
            <Button pill size="sm" onClick={() => signOut({callbackUrl:'/'})} className="logout">
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavbarLink as={Link} href="/login" className="cursor-pointer">
              Login
            </NavbarLink>
            <NavbarLink as={Link} href="/signup" className="cursor-pointer">
              Register
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
