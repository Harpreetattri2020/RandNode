import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});

const userAdded = () => ({
  type: types.ADD_USER,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
});



export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get("http://www.localhost:5000/")
      .then((resp) => {
        console.log("resp", resp.data.users);
        dispatch(getUsers(resp.data.users));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .post(`http://www.localhost:5000/${id}`)
      .then((resp) => {
        console.log("resp", resp.data.users);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post("http://www.localhost:5000/create", user)
      .then((resp) => {
        console.log("resp", resp.data);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};


export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .post(`http://www.localhost:5000/user/${id}`, user)
      .then((resp) => {
        console.log("resp", resp.data);
        dispatch(userUpdated());
      })
      .catch((error) => console.log(error));
  };
};
