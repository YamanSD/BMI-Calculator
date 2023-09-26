import React from "react";
import "./NumericInput.css";

const NumericInput = () => {
    return (
        <div className="formContainer">
            <input id="message" className="formField" placeholder="Your Message"></input>
            <label htmlFor="message" className="form__label">Your Message</label>
        </div>
    );
};

export default NumericInput;
