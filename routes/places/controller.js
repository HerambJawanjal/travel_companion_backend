const axios = require('axios');

exports.getDestinations = async (req, res) => {
    try {
        // Extract latitude and longitude from the query parameters
        const { lat, lon } = req.query;

        // Validate the input
        if (!lat || !lon) {
            return res.status(400).send({ error: "Latitude and longitude are required." });
        }

        // Define the bounding box around the current location (for simplicity, a small area is used)
        const delta = 0.05; // Adjust this value for a larger/smaller bounding box
        const minLon = parseFloat(lon) - delta;
        const maxLon = parseFloat(lon) + delta;
        const minLat = parseFloat(lat) - delta;
        const maxLat = parseFloat(lat) + delta;

        // Construct the API URL dynamically
        const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=rect:${minLon},${maxLat},${maxLon},${minLat}&limit=20&apiKey=c501f86775594e4b90ac2bbb620a4ef8`;

        // Make the API call using axios
        const response = await axios.get(apiUrl);

        // Send the result to the client
        res.send(response.data);
    } catch (error) {
        console.error("Error in getDestinations:", error.message);
        res.status(500).send({ error: "Failed to fetch tourist destinations." });
    }
};
