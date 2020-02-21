const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:platform/:gamertag', async (req, res) => {
    try {
        // Tracker api requires the key be sent as a header in requests.
        const headers = {
            'TRN-API-KEY': process.env.TRACKER_API_KEY,
        }
        
        // Generate a request to the tracker api and convert it to json
        const {platform, gamertag} = req.params;
        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`, {headers})
        const jsonData = await response.json();

        // Check for errors from the Tracker api
        if (jsonData.errors && jsonData.errors.length > 0) {
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        res.json(jsonData)

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

module.exports = router;