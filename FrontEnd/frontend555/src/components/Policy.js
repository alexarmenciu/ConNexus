// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const Policy = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getPublicContent().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response && error.response.data) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>Privacy Policy</h3>
//       </header>
//       <h2>
//         - We only collect what information you give us. <br></br>
//         - We will auto delete user accounts after one year of inactivity. <br></br>
//         - We keep track of when users are last online to know when to auto delete accounts. <br></br>
//         - We do not track anything else whatsoever. <br></br>
//         - Users can modify all information provided.
//       </h2>
//     </div>
//   );
// };

// export default Policy;


import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import termsFrPath from './PrivacyPolicy.md'

class Policy extends Component {
  constructor(props) {
    super(props)

    this.state = { terms: null }
  }

  componentWillMount() {
    fetch(termsFrPath).then((response) => response.text()).then((text) => {
      this.setState({ terms: text })
    })
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown source={this.state.terms} />
      </div>
    )
  }
}

export default Policy