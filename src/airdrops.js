
const axios = require('axios');
const {defaultHtmlContent} = require('./main.js')

const fetchAirdropDataAndGenerateHTML = async () => {
    try {
        // Make the API request
        const url = "https://api.airdropking.io/airdrops/?amount=6&order=best";
        const response = await axios.get(url);
        
        // Check if the request was successful
        if (response.status === 200) {
            // Parse the JSON response
            const data = response.data;
            
            // Create HTML content for the newsletter
            let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Airdrop Newsletter</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 20px;
                        background-color: #f8f8f8;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                    }
                    .airdrop {
                        margin-bottom: 20px;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .airdrop img {
                        max-width: 100px;
                        border-radius: 5px;
                        margin-right: 20px;
                    }
                    .airdrop h2 {
                        color: #2ecc71;
                    }
                    .airdrop p {
                        margin: 0 0 10px;
                    }
                    .airdrop a {
                        color: #3498db;
                        text-decoration: none;
                    }
                    .airdrop a:hover {
                        text-decoration: underline;
                    }
                    .disclaimer {
                        margin-top: 20px;
                        padding: 10px;
                        background-color: #f9ebc4;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Airdrop Newsletter</h1>
            `;
            
            // Iterate over each airdrop and add it to the HTML content
            data.forEach(airdrop => {
                htmlContent += `
                    <div class="airdrop">
                        <img src="${airdrop.thumbnail}" alt="${airdrop.name}">
                        <h2>${airdrop.name}</h2>
                        <p><strong>Symbol:</strong> ${airdrop.token}</p>
                        <p><strong>About:</strong> ${airdrop.about}</p>
                        <p><strong>Platform:</strong> ${airdrop.token_type}</p>
                        <p><strong>End Date:</strong> ${airdrop.end_date}</p>
                        <p><strong>Days Left:</strong> ${airdrop.days_left}</p>
                        <p><a href="${airdrop.url_airdrop}">Join Airdrop</a></p>
                        <p><a href="${airdrop.url_king}">More Info</a></p>
                    </div>
                `;
            });
            
            // Add disclaimer
            htmlContent += `
                <div class="disclaimer">
                    <p><strong>Disclaimer:</strong> The information provided in this newsletter is sourced from the Airdrop King API. We do not guarantee the accuracy or reliability of the information provided. Please conduct your own research before participating in any airdrops.</p>
                </div>
            `;
            
            // Close the HTML content
            htmlContent += `
                </div>
            </body>
            </html>
            `;



            return htmlContent
            

        } else {
            console.log("Failed to fetch airdrop data.");
            return defaultHtmlContent
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

module.exports = fetchAirdropDataAndGenerateHTML