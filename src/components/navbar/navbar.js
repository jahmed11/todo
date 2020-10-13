import React from "react";
import NavigationItems from "../navigationItems/navigationItems";
import { Navbar } from "react-bootstrap";
import "./navbar.css";
const Nav = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">ToDo</Navbar.Brand>
      <NavigationItems logout={props.logout} token={props.token} />
    </Navbar>
  );
};
export default Nav;
