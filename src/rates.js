const axios = require('axios');
const {defaultHtmlContent} = require('./main.js')

const  fetchDataAndGenerateHTML = async () => {
    try {
        // Make the API request
        const url = "https://api.coincap.io/v2/rates";
        const response = await axios.get(url);
        
        // Check if the request was successful
        if (response.status === 200) {
            // Parse the JSON response
            const data = response.data.data;
            
            // Sort the data alphabetically by currency ID
            const sortedData = data.sort((a, b) => a.id.localeCompare(b.id));
            
            // Define color themes
            const themeColors = {
                "positive": "#2ecc71",  // Green
                "negative": "#e74c3c"   // Red
            };
            
            // Create HTML content with styling and colors
            let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Crypto Exchange Rates</title>
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
                        color: #3498db; /* Blue */
                        text-align: center;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th.positive {
                        background-color: #2ecc71; /* Green */
                    }
                    th.negative {
                        background-color: #e74c3c; /* Red */
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:hover {
                        background-color: #f5f5f5;
                    }
                    .negative {
                        color: #e74c3c; /* Red */
                    }
                    .positive {
                        color: #2ecc71; /* Green */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Crypto Exchange Rates</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Symbol</th>
                                <th>Type</th>
                                <th>Rate (USD)</th>
                                <th>Equivalent to 1 USD</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            // Loop through each currency and add it to the HTML content
            sortedData.forEach(currency => {
                // Capitalize the first letter of the currency ID
                const currencyId = currency.id.charAt(0).toUpperCase() + currency.id.slice(1);
                
                // Calculate equivalent to 1 USD
                const equivalentTo1Usd = 1 / parseFloat(currency.rateUsd);
                
                // Determine color for change percentage
                const changeColor = parseFloat(currency.rateUsd) >= 1 ? themeColors.positive : themeColors.negative;
                
                htmlContent += `
                            <tr>
                                <td>${currencyId}</td>
                                <td>${currency.symbol}</td>
                                <td>${currency.type}</td>
                                <td>$${currency.rateUsd}</td>
                                <td class="${changeColor}">${equivalentTo1Usd.toFixed(6)}</td>
                            </tr>
                `;
            });
            
            // Close the HTML content
            htmlContent += `
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
            `;
            
            return htmlContent
        } else {
            console.log("Failed to fetch data from API.");
            return defaultHtmlContent
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}


module.exports = fetchDataAndGenerateHTML

