import React, { useState, useEffect } from "react";

import "./Policy.css";
import ReactMarkdown from 'react-markdown'
import termsFrPath from './PrivacyPolicy.md'

const Policy = ()=> {

  let [ content, setContent] = useState({md: ""});

  useEffect(()=> {
      fetch(termsFrPath)
          .then((res) => res.text())
          .then((md) => {
              setContent({ md })
          })
  }, [])

  return (
    <div className="post">
      <ReactMarkdown children={content.md}/>
    </div>
    
  )
}

export default Policy;

