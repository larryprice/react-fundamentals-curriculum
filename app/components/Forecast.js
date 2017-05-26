const React = require('react');
const Loading = require('./Loading');
const api = require('../utils/api');
const minutesFromNow = api.minutesFromNow;
const PropTypes = require('prop-types');
const queryString = require('query-string');
const DaySimple = require('./SimpleDay');
const Redirect = require('react-router').Redirect;

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    var qs = queryString.parse(this.props.location.search);
    this.location = qs.location;

    this.state = {
      loading: true,
      weather: null,
      detail: null,
    }

    this.handleDetail = this.handleDetail.bind(this);
  }

  componentDidMount() {
    api.getFiveDay(this.location)
      .then((weatherData) => {
        this.setState(() => {
          return {
            loading: false,
            weather: weatherData
          }
      });
    });
  }

  handleDetail(index) {
    this.setState(() => {
      return {
        detail: index,
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    if (this.state.detail) {
      return <Redirect push
                       to={{pathname: '/detail/' + this.location,
                            search: '?day=' + this.state.detail}}
                     />;
    }

    return (
      <div>
        <h1 className='location-header'>{this.location}</h1>
        <div className="days-simple">
          {this.state.weather.list.map((item, index) => {
            return (
              <DaySimple icon={item.weather[0].icon} key={index} day={new Date(item.dt*1000)} clickHandler={this.handleDetail.bind(null, item.dt)} />
            )
          })}
        </div>
      </div>
    );
  }
}

module.exports = Forecast;
