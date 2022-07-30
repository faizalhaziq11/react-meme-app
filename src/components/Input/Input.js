import React, { useState } from "react";
import styles from "./Input.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Input = (props) => {
  const [enteredInput, setEnteredInput] = useState("");

  const inputSubmitHandler = (event) => {
    event.preventDefault();

    props.searchHandler(enteredInput);
    setEnteredInput("");
  };

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  return (
    <React.Fragment>
      <Card className={styles.input}>
        <form onSubmit={inputSubmitHandler}>
          <label htmlFor="input">Search</label>
          <input
            id="input"
            type="text"
            value={enteredInput}
            onChange={inputChangeHandler}
          />
          <Button type="submit">Enter</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Input;
