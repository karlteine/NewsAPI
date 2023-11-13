var apiKey = 'your_key'; // Your News API key
var category = 'technology'; // Set the category to 'technology'
var numberOfArticles = 3; // Number of articles you want
var language = 'en'; // English language

// Calculate the current date in the format YYYY-MM-DD
var currentDate = new Date().toISOString().slice(0, 10);

// Step 1: Retrieve sources that provide technology news
var sourcesUrl = `https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}&category=${category}`;

fetch(sourcesUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Check if the request was successful
    if (data.status === 'ok' && data.sources.length > 0) {
      // Get the IDs of the technology news sources
      var techSourceIds = data.sources.map(source => source.id);

      // Step 2: Fetch the top headlines from technology news sources with a language filter
      var topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&sources=${techSourceIds.join(',')}&language=${language}&from=${currentDate}`;

      // Fetch top headlines from technology news sources
      fetch(topHeadlinesUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Check if the request was successful
          if (data.status === 'ok' && data.articles.length >= numberOfArticles) {
            // Get the three latest technology news articles in English from today
            var latestTechNews = data.articles.slice(0, numberOfArticles);

            // Log the titles, descriptions, URLs, publication dates, and source names
            latestTechNews.forEach(article => {
              console.log('Title: ' + article.title);
              console.log('Description: ' + article.description);
              console.log('URL: ' + article.url);
              console.log('Published At: ' + article.publishedAt);
              console.log('Source: ' + article.source.name);
              console.log('---');
            });

            // Once you have the news data, you can display it in your HTML
            displayNewsInHTML(latestTechNews);
          } else {
            console.error('Error fetching top headlines: ' + data.message);
          }
        })
        .catch(function(error) {
          console.error('Error fetching top headlines: ' + error);
        });
    } else {
      console.error('Error fetching sources: ' + data.message);
    }
  })
  .catch(function(error) {
    console.error('Error fetching sources: ' + error);
  });

function displayNewsInHTML(articles) {
  // Loop through each article and populate the placeholders
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const articleContainer = document.getElementById(`article${i + 1}`);

    if (articleContainer) {
      // Check if the article has an image
      const hasImage = article.urlToImage !== null;

      articleContainer.innerHTML = `
        <h3>${article.title}</h3>
        ${hasImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="article-image">` : ''}
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank" class="btn btn-primary btn-hover">Read more</a>
        <p>Published At: ${formatPublishedDate(article.publishedAt)}</p>
        <p>Source: ${article.source.name}</p>
      `;
    }
  }
}

// Function to format the published date
function formatPublishedDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Function to fetch and display news when the page loads
document.addEventListener('DOMContentLoaded', () => {
});