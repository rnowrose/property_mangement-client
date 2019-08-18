import React, { Component } from "react";
const footerStyle = {
    backgroundColor: "#3f51b5",
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  };
  
  const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
  };
  
  function Bottom({ children }) {
    return (
      <div>
        <div style={phantomStyle} />
        <div style={footerStyle}>{children}</div>
      </div>
    );
  }
  
export default class Footer extends Component {
    render() {
        return (
            <Bottom>
            <span>Property Of Rownok Nowrose</span>
          </Bottom>
        );
    }
}