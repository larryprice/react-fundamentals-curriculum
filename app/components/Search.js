const React = require('react');
const SearchBox = require('./SearchBox');
const api = require('../utils/api');

function Search(props) {
  return (
    <div className='search-container'>
      <div>
        <h1>Enter a City and State</h1>
      </div>
      <SearchBox match={props.match} />
    </div>
  )
}

module.exports = Search;
