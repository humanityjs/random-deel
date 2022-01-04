import React, { useCallback, useEffect, useState } from 'react';
import { getWords } from '../../api/api';
import './autocomplete.css';

export default function Autocomplete() {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const fetchWords = useCallback(async (str) => {
    const res = await getWords(str);
    setResults(res);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ideally we should debounce this input
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (searchString.length >= 3) {
      fetchWords(searchString);
    }
  }, [searchString, fetchWords]);

  useEffect(() => {
    if (searchString.length < 3 && results.length) {
      setResults([]);
    }
  }, [searchString, results]);

  const displayWords = (word: string) => {
    const splitted = word.split(searchString);
    const mapped = splitted
      .map((s: string, index: number) => {
        if (index === 0 || index !== splitted.length - 1) {
          return `${s}<span class="search-string">${searchString}</span>`;
        } else {
          return s;
        }
      })
      .filter((s) => s !== undefined)
      .join('');

    return <li dangerouslySetInnerHTML={{ __html: mapped }} key={word}></li>;
  };

  return (
    <div>
      <div className="search">
        <input
          onChange={onChange}
          value={searchString}
          placeholder="Search here. e.g. def"
        />
      </div>
      {
        !results.length && (
          <p>Suggestions will appear here when you've typed more than 2 letters.</p>
        )
      }
      <ul className="list">{results.map((word) => displayWords(word))}</ul>
    </div>
  );
}
