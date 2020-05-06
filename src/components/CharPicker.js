import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const proxyUrl = 'https://agile-retreat-53532.herokuapp.com/',
  targetUrl = 'https://swapi.dev/api/people'

const CharPicker = props => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //executes after render, like componentDidMount
  useEffect(() => {
      setIsLoading(true);
      fetch(proxyUrl + targetUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch.');
          }
          return response.json();
        })
        .then(charData => {
          const selectedCharacters = charData.results.slice(0, 5);
          setIsLoading(false);
          setLoadedChars( 
            selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
            }))
          );
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }, []);

    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      loadedChars &&
      loadedChars.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {loadedChars.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!loadedChars || loadedChars.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;

}

export default CharPicker;
