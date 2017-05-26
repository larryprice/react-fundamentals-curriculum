const axios = require('axios');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const app_id = '3d4c3043654ce2a2674b7a4151bf7b7d';

function minutes_from_now(minutes) {
    return new Date((new Date()).getTime() + minutes*60000);
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  minutesFromNow: minutes_from_now,
  getFiveDay: function(location) {
    var weather = localStorage.getItem(location);
    if (weather) weather = JSON.parse(weather);

    if (!weather || new Date(weather.expires_at) < (new Date())) {
      var encodedURI = window.encodeURI('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + '&type=accurate&cnt=5&APPID=' + app_id);

      return axios.get(encodedURI)
          .then((response) => {
            localStorage.setItem(location, JSON.stringify({
              fiveDay: response.data,
              expires_at: minutes_from_now(10)
            }));

            return response.data;
          })
          .catch(handleError);
    }

    return new Promise((resolve, reject) => { resolve(weather.fiveDay) });
  }
};
