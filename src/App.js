import './App.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [person, setPerson] = useState({});

  const fetchData = async () => {
    const URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${user}`;
    // const URL = `https://api.github.com/users/${user}`;
    if (!user) return;

    const result = await fetch(URL);
    result.json().then((json) => {
      setPerson(json);
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
  }

  console.log(person.query);

  return (
    <div className='App'>
      <div className='page-wrapper'>
        <main className='main-content'>
          <h1 className='main-heading'>Wikipedia Search</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <input
                id='input'
                className='input-search'
                placeholder='Search Wikipedia'
                type='text'
                value={user}
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </div>
            <div className='buttons'>
              <button type='submit' className='button-search' id='fetchdata'>
                Search
              </button>
              <button className='clear-search-btn'>Back</button>
            </div>
          </form>
          {person.query &&
            person.query.search.map((article) => (
              <div id='app'>
                <a
                  href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                  target='_blank'
                  className='articles'
                >
                  <p>{article.snippet}</p>
                </a>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}

export default App;
