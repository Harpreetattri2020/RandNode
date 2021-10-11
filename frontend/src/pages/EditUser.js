import React, { useState, } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { updateUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();

  
  let { id ,usr,eml,gedr,dob} = useParams();
  console.log(usr);
  const [state, setState] = useState({
    name: usr,
    email: eml,
    gender: gedr,
    dateOfBirth: dob,
  });
  const [error, setError] = useState("");
  
  let history = useHistory();
  let dispatch = useDispatch();
  const { name, email, gender, dateOfBirth } = state;

 

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !email || !dateOfBirth) {
      setError("Please input all input Field");
    } else {
      dispatch(updateUser(state, id));
      history.push("/");
      setError("");
    }
  };
  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <h2>Edit User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          value={name || ""}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Gender"
          value={gender || ""}
          name="contact"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="dateOfBirth(DD-MM-YYYY)"
          value={dateOfBirth || ""}
          name="dateOfBirth"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;