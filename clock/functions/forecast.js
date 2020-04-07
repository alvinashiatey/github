import axios from "axios";

exports.handler = async (event, context, callback) => {
  console.log(event.queryStringParameters.lat);
  const lat = 37.8267;
  const lng = -122.4233;
  axios({
    method: "get",
    url: `https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`,
    data: { name: "weather" },
  })
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
