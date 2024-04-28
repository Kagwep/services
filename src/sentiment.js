const axios = require('axios');
const {defaultHtmlContent} = require('./main.js')

const  fetchSentimentDataAndGenerateHTML = async () =>  {
    try {
        // Make the API request
        const url = "https://api.tokenmetrics.com/v2/sentiments?limit=1000&page=0";
        const headers = {
            "accept": "application/json",
            "api_key": "tm-e5272df1-6fb4-4d7d-b953-52f1dc28b058"  // Replace with your actual API key
        };
        const response = await axios.get(url, { headers });
        
        // Check if the request was successful
        if (response.status === 200) {
            // Parse the JSON response
            const data = response.data;
            
            // Extract the relevant fields from the first data object
            const sentimentData = data.data[0];
            
            // Define colors for title text
            const titleColor1 = "#ff0000";  // Red
            const titleColor2 = "#008000";  // Green
            const titleColor3 = "#0000ff";  // Blue
            
            // Create HTML content with styling and colors
            let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sentiment Data Newsletter</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 20px;
                        background-color: #f8f8f8;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    p {
                        margin-bottom: 20px;
                        color: #555;
                    }
                    strong {
                        font-weight: bold;
                        color: #333;
                    }
                    .highlight {
                        background-color: #f0f0f0;
                        padding: 10px;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 style="color: ${titleColor1}">Sentiment Data Newsletter</h1>
                    <p><strong style="color: ${titleColor2}">DATETIME:</strong> ${sentimentData.DATETIME}</p>
                    <p><strong style="color: ${titleColor3}">MARKET SENTIMENT GRADE:</strong> ${sentimentData.MARKET_SENTIMENT_GRADE}</p>
                    <p><strong style="color: ${titleColor1}">MARKET SENTIMENT LABEL:</strong> ${sentimentData.MARKET_SENTIMENT_LABEL}</p>
                    <p><strong style="color: ${titleColor2}">NEWS SENTIMENT GRADE:</strong> ${sentimentData.NEWS_SENTIMENT_GRADE}</p>
                    <p><strong style="color: ${titleColor3}">NEWS SENTIMENT LABEL:</strong> ${sentimentData.NEWS_SENTIMENT_LABEL}</p>
                    <p class="highlight"><strong style="color: ${titleColor1}">NEWS SUMMARY:</strong> ${sentimentData.NEWS_SUMMARY}</p>
                    <p><strong style="color: ${titleColor2}">REDDIT SENTIMENT GRADE:</strong> ${sentimentData.REDDIT_SENTIMENT_GRADE}</p>
                    <p><strong style="color: ${titleColor3}">REDDIT SENTIMENT LABEL:</strong> ${sentimentData.REDDIT_SENTIMENT_LABEL}</p>
                    <p class="highlight"><strong style="color: ${titleColor1}">REDDIT SUMMARY:</strong> ${sentimentData.REDDIT_SUMMARY}</p>
                    <p><strong style="color: ${titleColor2}">TWITTER SENTIMENT GRADE:</strong> ${sentimentData.TWITTER_SENTIMENT_GRADE}</p>
                    <p><strong style="color: ${titleColor3}">TWITTER SENTIMENT LABEL:</strong> ${sentimentData.TWITTER_SENTIMENT_LABEL}</p>
                    <p class="highlight"><strong style="color: ${titleColor1}">TWITTER SUMMARY:</strong> ${sentimentData.TWITTER_SUMMARY}</p>
                </div>
            </body>
            </html>
            `;

            return htmlContent
        } else {
            console.log("Failed to fetch sentiment data.");
            return defaultHtmlContent
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}


module.exports = fetchSentimentDataAndGenerateHTML