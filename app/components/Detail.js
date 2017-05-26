const React = require('react');
// const PropTypes = require('prop-types');
const queryString = require('query-string');
const DaySimple = require('./SimpleDay');
const api = require('../utils/api');
const minutesFromNow = require('../utils/api').minutesFromNow;
const Loading = require('./Loading');

class Detail extends React.Component {
  constructor(props) {
    super(props);

    var qs = queryString.parse(this.props.location.search);
    this.datetime = qs.day;
    this.location = this.props.match.params.location;

    this.state = {
      loading: true,
      weather: null,
    }
  }

  componentDidMount() {
    api.getFiveDay(this.location)
      .then((weatherData) => {
        this.setState(() => {
          return {
            loading: false,
            weather: weatherData.list.filter((item) => {
              return item.dt == this.datetime;
            })[0]
          }
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    return (
      <div className="day-detail">
        <DaySimple day={new Date(this.datetime*1000)} icon={this.state.weather.weather[0].icon} />
        <div className='weather-info'>{this.location}</div>
        <div className='weather-info'>{this.state.weather.weather[0].description}</div>
        <div className='weather-info'>{"today's high: " + this.state.weather.temp.max}</div>
        <div className='weather-info'>{"today's low: " + this.state.weather.temp.min}</div>
        <div className='weather-info'>{"humidity: " + this.state.weather.humidity}</div>
      </div>
    );
  }
}

module.exports = Detail;
