import Link from "next/link";
import React from "react";
import "./navbar.scss";

function Navbar() {
  return (
    <div>
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <Link href="/">Next JS ToDo</Link>
          </div>
          <nav className="nav">
            <div className="nav-mobile">
              <Link id="nav-toggle" href="/">
                <span></span>
              </Link>
            </div>
            <ul className="nav-list">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/services">Service</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
