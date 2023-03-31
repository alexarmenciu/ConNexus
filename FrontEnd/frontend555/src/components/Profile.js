import React from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  function handleClickPassword() {
    navigate("/changePassword");
    window.location.reload();
  }
  function handleClickUsername() {
    navigate("/changeUsername");
    window.location.reload();
  }
  function handleDeleteAccount() {
    navigate("/deleteuser");
    window.location.reload();
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong>'s Profile
        </h3>
      </header>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      
      {/* <p>
        <strong>Email:</strong> {currentUser.email}
      </p> */}
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
      <p className="lead">
          <button className="btn btn-secondary"
              onClick={handleClickUsername}>Change Username
          </button>
      </p>
      <p className="lead">
          <button className="btn btn-secondary"
              onClick={handleClickPassword}>Change Password
          </button>
      </p>
      <p className="lead">
          <button className="btn btn-warning"
              onClick={handleDeleteAccount}>Delete Account
          </button>
      </p>
      <Link to={"/policy"} className="nav-link">
        Privacy Policy <i class="bi bi-link-45deg"></i>
      </Link>
    </div>
  );
};

export default Profile;