const React = require('react');
const Link = require('react-router-dom').Link;
const Redirect = require('react-router').Redirect;
const PropTypes = require('prop-types');
const api = require('../utils/api');

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({redirect: true});
    }

    var value = event.target.value;
    this.setState(() => {
      return {
        city: value,
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push
                       to={{pathname: this.props.match.url + '/forecast',
                            search: '?location=' + this.state.city}} />;
    }

    return (
      <div className={this.props.vertical ? 'address-input' : 'address-input address-input-horizontal'}>
        <input placeholder='Champaign, IL' className='form-control' onKeyUp={this.handleChange} />
        <Link className='btn btn-success address-input-space'
              to={{pathname: this.props.match.url + '/forecast',
                   search: '?location=' + this.state.city}}>
          Get Weather
        </Link>
      </div>
    );
  }
}

SearchBox.propTypes = {
  vertical: PropTypes.bool,
  match: PropTypes.object,
}

SearchBox.defaultProps = {
  vertical: true,
  match: {url: ''},
}

module.exports = SearchBox;
