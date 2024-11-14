import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search.jsx";
import Results from "./components/Results.jsx";
import Popup from "./components/Popup.jsx";
import Spinner from "./components/Spinner.jsx";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });
  const [loading, setLoading] = useState(false);
  const apiurl = "https://www.omdbapi.com/?apikey=18597b6";

  const search = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
        setLoading(false);
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    setLoading(true);
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
      setLoading(false);
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        {loading ? (
          <Spinner />
        ) : (
          <>
            <Results results={state.results} openPopup={openPopup} />

            {typeof state.selected.Title != "undefined" ? (
              <Popup selected={state.selected} closePopup={closePopup} />
            ) : (
              false
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
