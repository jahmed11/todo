import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

import "./navigationItems.css";
const navigationItems = (props) => {
  console.log(props.token);
  return (
    <>
      <Nav style={{ width: "100%" }}>
        <ul className="navbar-nav _ul">
          <li className="nav-item _li">
            <NavLink className="nav-link" to="/addtask" exact>
              Task
            </NavLink>
          </li>
          <li className="nav-item _li">
            {props.token ? (
              <button className="btn btn-warning" onClick={props.logout}>
                {" "}
                Log out
              </button>
            ) : (
              <NavLink className="nav-link" to="/" exact>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </Nav>
    </>
  );
};

export default navigationItems;
