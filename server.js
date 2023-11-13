const express = require('express');
const path = require('path'); 
const axios = require('axios');
const app = express();
const port = 3000;
const apiKey = 'your_key';

// Serve static HTML files from the "news" directory on your desktop
const publicPath = path.join(__dirname, '../news'); // Modify the path based on your directory structure
app.use(express.static(publicPath));

// Define a route to fetch news from the News API
app.get('/api/news', async (req, res) => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&category=technology&language=en&pageSize=3`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});