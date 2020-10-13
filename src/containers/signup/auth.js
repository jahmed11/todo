import React, { useState } from "react";
import "./auth.css";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../store/actions/auth";

const Auth = () => {
  const redirectState = useSelector((state) => state.redirect);
  const redirect = useDispatch();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const changedHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    axios
      .post("https://mern-app147.herokuapp.com/user/signup", formData)
      .then((response) => {
        dispatch(
          actionCreators.getUserData(
            response.data.name,
            response.data.userId,
            response.data.token
          )
        );
        const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userName: response.data.name,
            userId: response.data.userId,
            token: response.data.token,
            expiration: expirationTime.toISOString(),
          })
        );
      })
      .catch((err) => console.log(err, "sign up failed in react"));

    setIsLoading(false);
    redirect(actionCreator.redirect());
  };
  return (
    <div>
      {redirectState && <Redirect to="/addtask" />}
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-group form">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              className="form-control"
              name="name"
              placeholder="name"
              onChange={changedHandler}
            />

            <label>Email</label>
            <input
              type="email"
              value={form.email}
              id="email"
              placeholder="email"
              name="email"
              className="form-control"
              onChange={changedHandler}
            />
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              id="password"
              placeholder="password"
              name="password"
              className="form-control"
              onChange={changedHandler}
            />
            <button type="submit" className="btn btn-outline-primary mt-2">
              Signup
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
