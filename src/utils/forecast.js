const request = require('postman-request')

const forecast = (lat, long,loc, callback) => {
  const key= '533346631ff266693778203a32a04070'
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`
  request({ url, json: true }, (error, response) => {
      if (error) {
          callback("Unable to connect", undefined);
      } else if (response.body.error) {
          callback("Unable to find location", undefined);
      } else {
          callback(undefined, "In "+loc+" the temperature is "+response.body.current.temperature +" C");
      }
  });
}

module.exports = forecast;