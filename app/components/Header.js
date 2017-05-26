const React = require('react');
const SearchBox = require('./SearchBox');

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='row header'>
        <div className='column'>
          <h1>
            Show me the weather!
          </h1>
        </div>
        <div className='column'>
          <SearchBox vertical={false} />
        </div>
      </div>
    )
  }
}

module.exports = Header;
