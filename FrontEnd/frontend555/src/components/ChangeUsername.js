import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
const ChangeUsername = (props) => {
  const form = useRef();
  const currentUser = AuthService.getCurrentUser();
  const checkBtn = useRef();

  const [oldPassword, setOldPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeOldPassword = (e) => {
    const OldPassword = e.target.value;
    setOldPassword(OldPassword);
  };

  const onChangeNewUsername = (e) => {
    const newUsername = e.target.value;
    setNewUsername(newUsername);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.changeUsername(currentUser.id, currentUser.username, oldPassword, newUsername, oldPassword).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          if (response.data.username) {
              // Get the existing data
              var existing = localStorage.getItem('user');
        
              // Add new data to localStorage Array
              existing['username'] = response.data.username;
              // Save back to localStorage
              localStorage.setItem('user', JSON.stringify(existing));
              //window.location.reload();

              // NOTE: it's updating the local storage with new username, but it's not updating in the navbar... don't know how to do it yet.
            }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>
          Username Change
        </h2>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="oldPassword">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={onChangeOldPassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Username</label>
                <Input
                  type="string"
                  className="form-control"
                  name="newUsername"
                  value={newUsername}
                  onChange={onChangeNewUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Save</button>
              </div>

            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default ChangeUsername;