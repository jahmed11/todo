import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/layout";
import ToDO from "./containers/addTasks/tasks";
import Auth from "./containers/signup/auth";
import Login from "./containers/login/login";
import { useDispatch } from "react-redux";
import * as actionCreators from "./store/actions/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (
      userInfo &&
      userInfo.token &&
      new Date(userInfo.expiration) > new Date()
    ) {
      dispatch(
        actionCreators.getUserData(
          userInfo.userName,
          userInfo.userId,
          userInfo.token
        )
      );
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/addtask" component={ToDO} />
          <Route exact path="/signup" component={Auth} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
