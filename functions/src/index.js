const functions = require('firebase-functions');
const axios = require('axios');

exports.queryJobs = functions.https.onRequest((request, response) => {
    const {
        page = 0,
        description = "",
        location = ""
    } = request.query;

    const url = "https://jobs.github.com/positions.json";
    const params = {
        markdown: true,
        page,
        description,
        location,
    }

    axios
        .get(url, {params})
        .then((apiResponse) => {
            return response.set('Access-Control-Allow-Origin', '*').json(apiResponse.data);
        })
        .catch((error) => {
            functions.logger.error(error);
        });
});
