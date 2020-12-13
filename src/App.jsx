import React, { useState } from "react";
import './App.css';

function App() {
  const [inputValues, setInputValues] = useState({
    title: "",
    poster: "",
    comment: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputValues),
    };
    const url = "https://post-a-form.herokuapp.com/api/movies/";
    fetch(url, config)
      .then(res => res.json)
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else alert(`${inputValues.title} sent`);
      })
      .catch(e => {
        console.error(e);
        alert("there was en error when adding the movie to the database");
      })
  }

  return (
    <div className="App">
      <form className="movie-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add a Movie to the Database</legend>
          <div className="form-data">
            <label htmlFor="title">Title of the movie:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputValues.title}
              placeholder="Movie title"
              onChange={handleChange}
            />
          </div>
          <div className="form-data">
            <label htmlFor="poster">Link of the poster:</label>
            <input
              type="text"
              id="poster"
              name="poster"
              value={inputValues.poster}
              placeholder="Image URL"
              onChange={handleChange}
            />
          </div>
          <div className="form-data">
            <label htmlFor="comment">Comment about it:</label>
            <textarea
              rows="5"
              id="comment"
              name="comment"
              value={inputValues.comment}
              placeholder="Enter a comment (why do you like this movie? what made you stand out? etc.)."
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Send the data</button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
