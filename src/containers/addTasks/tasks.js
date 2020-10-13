import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./task.css";

const ToDO = () => {
  console.log("addTask");
  const userName = useSelector((state) => state.userName);
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  const [userData, setUserData] = useState([]);
  const [state, setState] = useState("");
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://mern-app147.herokuapp.com/api/task/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUserData(response.data.userTask);
        });
    }
  }, [userName, userId, uploaded, token]);

  const taskHandler = (event) => {
    setState(event.target.value);
  };

  const addTasks = async (event) => {
    event.preventDefault();
    setUploaded(true);
    const addNewTask = {
      task: state,
      creator: userId,
    };
    await axios
      .post("https://mern-app147.herokuapp.com/api/task/", addNewTask, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((err) => console.log(err));
    setUploaded(false);
  };

  const deleteHandler = async (id) => {
    setUploaded(true);
    await axios.delete(`https://mern-app147.herokuapp.com/api/task/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUploaded(false);
  };

  const displayItems = () => {
    if (userData)
      return userData.map((item) => {
        return (
          <div className="items" key={item._id}>
            <li className="item" key={item._id}>
              {item.task}
            </li>
            <button
              className="deleteButton"
              onClick={() => deleteHandler(item._id)}
            >
              <FontAwesomeIcon className="trash" icon={faTrash} />
            </button>
          </div>
        );
      });
  };

  return (
    <>
      {uploaded ? (
        <Spinner />
      ) : (
        <div className="todo">
          {userName && (
            <p style={{ textTransform: "capitalize", fontSize: "25px" }}>
              Welcome {userName}
            </p>
          )}
          <form onSubmit={addTasks}>
            <input
              className="form-control"
              type="text"
              placeholder="Add new task"
              name="input"
              value={state}
              onChange={taskHandler}
            />
            <button className="btn btn-outline-secondary m-2" type="submit">
              ADD
            </button>
          </form>
          <div>{displayItems()}</div>
        </div>
      )}
    </>
  );
};

export default React.memo(ToDO);
