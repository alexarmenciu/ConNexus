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

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

  

const ChangePassword = (props) => {
  const form = useRef();
  const currentUser = AuthService.getCurrentUser();
  const checkBtn = useRef();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const onChangeOldPassword = (e) => {
    const OldPassword = e.target.value;
    setOldPassword(OldPassword);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmpassword = e.target.value;
    setconfirmPassword(confirmpassword);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.changePassword(currentUser.id, currentUser.username, oldPassword, currentUser.username, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
          Password Change
        </h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password</label>
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
                <label htmlFor="newPassword">New Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required]}
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

export default ChangePassword;