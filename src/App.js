import logo from "./logo.svg";
import "./App.css";
import { setCORS } from "google-translate-api-browser";
import { useState, useEffect } from "react";
const translate = setCORS("http://cors-anywhere.herokuapp.com/");

function App() {
  const translateFunction = (languages) => {
    languages.forEach((language) => {
      translate("hello there", { to: language })
        .then((res) => {
          // I do not eat six days
          console.log(res);
          setTranslations([...translations, res.text]);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  const [languageChoice, setLanguageChoice] = useState(["ja"]);
  const [translations, setTranslations] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLanguageChoice((prevState) => {
      return [...prevState, input];
    });
  };

  useEffect(() => {
    translateFunction(languageChoice);
    return () => {
      translateFunction(languageChoice);
    };
  }, [languageChoice]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <input type="text" value={input} on/> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <p>{translations}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
