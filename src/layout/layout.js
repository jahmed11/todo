import React from "react";
import Nav from "../components/navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../store/actions/auth";
import { Redirect } from "react-router-dom";

const Layout = (props) => {
  const redirectState = useSelector((state) => state.redirect);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const redirectDispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(actionCreators.getUserData(null, null, null));
    redirectDispatch(actionCreators.redirect());
  };

  return (
    <div>
      {!redirectState ? <Redirect to="/" /> : null}
      <Nav logout={logoutHandler} token={token} />
      <main className="container">{props.children}</main>
    </div>
  );
};

export default Layout;
