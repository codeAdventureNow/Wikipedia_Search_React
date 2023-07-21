import './App.css';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [snippet, setSnippet] = useState([]);
  const [error, setError] = useState();

  function clearInput() {
    setSearch('');
  }

  const removeArticles = () => {
    setSnippet([]);
  };

  const fetchData = async () => {
    const URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${search}`;
    if (!search) return;

    const result = await fetch(URL);
    result.json().then((json) => {
      setSnippet(json.query.search);
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    clearInput();
    fetchData();
  }



  return (
    <div className='App'>
      <div className='pageWrapper'>
        <main className='mainContent'>
          <h1 className='mainHeading'>Wikipedia Search</h1>
          <form onSubmit={handleSubmit}>
            <div className='inputContainer'>
              <input
                id='input'
                className='inputSearch'
                placeholder='Search Wikipedia'
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className='buttons'>
              <button type='submit' className='buttonSearch' id='fetchdata'>
                Search
              </button>
              <button onClick={removeArticles} className='clearSearchBtn'>
                Back
              </button>
            </div>
          </form>

          {snippet?.map((article) => (
            <div key={article.pageid} id='app'>
              <a
                href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                target='_blank'
                className='articles'
              >
                <p>{article.snippet.replace(/<\/?[^>]+>/gi, '')}</p>
              </a>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
