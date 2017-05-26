const React = require('react');
const PropTypes = require('prop-types');

function DaySimple(props) {
  return (
    <div className="day-simple" onClick={props.clickHandler}>
      <img height="150px" src={"/app/images/weather-icons/" + props.icon + ".svg"} />
      <h3>{props.day.toDateString()}</h3>
    </div>
  )
}

DaySimple.propTypes = {
  icon: PropTypes.string.isRequired,
  day: PropTypes.object.isRequired,
  clickHandler: PropTypes.func,
}

DaySimple.defaultProps = {
  clickHandler: null,
}

module.exports = DaySimple;
