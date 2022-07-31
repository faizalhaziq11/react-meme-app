import React, { useState, useEffect, useMemo } from "react";

import Input from "./components/Input/Input";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const url = "https://api.imgflip.com/get_memes";
  const reactSpinner = <img src={logo} className="App-logo" alt="logo" />;

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.memes);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!input) return data;

    return data.filter((memes) =>
      memes.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [data, input]);

  const info = filteredData.map((memes) => {
    return (
      <div className="result" key={memes.id}>
        <img src={memes.url} alt={memes.name} width="60%" height="60%" />
        <div className="">{memes.name}</div>
      </div>
    );
  });

  const searchHandler = (inputData) => {
    setInput(inputData);
  };

  const notFound = (
    <p className="no-result">Could not find any memes from keyword `{input}`</p>
  );

  const showSearch = (
    <p className="response-result">Search results for `{input}` </p>
  );

  const searchResult = input.length > 0 ? showSearch : "";

  const result = info.length > 0 ? info : notFound;

  // if (isLoading) return reactSpinner;
  // if (!data) return <p>Helo, write your code here</p>;

  return (
    <React.Fragment>
      <div className="App-container">
        <Input searchHandler={searchHandler} />
        {isLoading && reactSpinner}
        {!data && <p>No data is loaded</p>}
        {searchResult}
        <div className="memes">{result}</div>
        {/* {data.map((memes) => (
          <div className="container" key={memes.id}>
            <img src={memes.url} alt={memes.name} width="35%" height="35%" />
            <div className="">{memes.name}</div>
          </div>
        ))} */}
        {/* <p>Helo, write your code here</p> */}
      </div>
    </React.Fragment>
  );
}

export default App;
