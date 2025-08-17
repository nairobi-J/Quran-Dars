const express= require('express');
const {google} = require('googleapis');
const router = express.Router();

const youtube = google.youtube({
    version:'v3',
    auth: process.env.YOUTUBE_API_KEY,
});

router.get('/youtube', async (req, res) => {
    const {query} = req.query;
    try {
        const response = await youtube.search.list({
            part:'snippet',
            q: query + ' বাংলা তাফসীর',
            maxResults: 5,
            type: 'video',
            relevanceLanguage: 'bn',
        })
       // In your Node.js backend route
const videos = response.data.items.map(item => ({
  id: item.id.videoId, // MUST be .videoId (not .id)
  title: item.snippet.title,
  thumbnail: item.snippet.thumbnails.medium.url
}));
        res.jsonp({videos});
    } catch(error){
        res.status(500).json({error:"Failed to fetch videos"});
    }
})

module.exports = router