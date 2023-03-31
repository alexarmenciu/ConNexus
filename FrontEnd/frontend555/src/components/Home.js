import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome to ConneXus</h3>
      </header>
      <card>
        <h4>
          ConneXus is the nexus of connections for all. 
        </h4>
        <h6>
          We're here to help you keep track of all your contacts information.
          Simply create an account and start adding contacts. You'll need a name for each contact, and you'll have the
          ability to add any information you'd like to the person. For example, want to keep track of their dog's name?
          Simply add a row called "dog's name" and input the description for it "Charlie" and so on. 
        </h6>
        <h4>
           Our Privacy Policy
        </h4>
        <h6>
          Your privacy matters! <br></br><br></br>Just know that all the information you provide can be modified by you. Plus, all the 
          information stored in our database is encrypted. Unlike other sites, we do absolutely no tracking of any sorts. Therefore don't
          expect any extensive improvement to user experience. Also, we only take the minimum required information on the contacts you save in your 
          account to provide the intended use of a contact manager. Finally, your account and all information, aka the contacts saved on it, will be 
          deleted from the cloud upon 150 days of inactivity, or if the user decides to delete their own account. <br></br><br></br>
          For more information, take a look at our privacy policy.
          <Link to={"/policy"} className="nav-link">
            Privacy Policy <i class="bi bi-link-45deg"></i>
          </Link>
        </h6>
          
        

      </card>
    </div>
  );
};

export default Home;