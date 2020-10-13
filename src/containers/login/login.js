import React, { useState, useCallback } from "react";
import "../signup/auth.css";
import Spinner from "../../components/spinner/spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actionCreator from "../../store/actions/auth";
import axios from "axios";

const Login = (props) => {
  const redirectState = useSelector((state) => state.redirect);
  const tokenState = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const redirect = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = useCallback(
    (event) => {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    },
    [form]
  );
  const submitHandler = async (event) => {
    event.preventDefault();
    if (tokenState === null) {
      const userData = {
        email: form.email,
        password: form.password,
      };
      setIsLoading(true);
      axios
        .post("https://mern-app147.herokuapp.com/user/login", userData)
        .then((response) => {
          const expirationTime = new Date(
            new Date().getTime() + 1000 * 60 * 60
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              userName: response.data.name,
              userId: response.data.userId,
              token: response.data.token,
              expiration: expirationTime.toISOString(),
            })
          );
          dispatch(
            actionCreator.getUserData(
              response.data.name,
              response.data.userId,
              response.data.token
            )
          );
        })
        .catch((err) => console.log(err));

      setIsLoading(false);
      redirect(actionCreator.redirect());
    } else {
      return;
    }
  };
  return (
    <div>
      {redirectState && <Redirect to="/addtask" />}
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-group form">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              id="email"
              placeholder="email"
              name="email"
              className="form-control"
              onChange={inputChangeHandler}
            />
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              id="password"
              placeholder="password"
              name="password"
              className="form-control"
              onChange={inputChangeHandler}
            />
            <button type="submit" className="btn btn-outline-primary mt-2">
              Log In
            </button>
            <p className="p">If you don't have an account</p>
            <button className="createAccount">
              <Link to="/signup">Create a new account</Link>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default React.memo(Login);
