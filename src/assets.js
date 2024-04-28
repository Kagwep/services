const axios = require('axios');
const {defaultHtmlContent} = require('./main.js')



const fetchCryptoAssets = async () => {
    try {
        // Make the API request
        const response = await axios.get('https://api.coincap.io/v2/assets');

        // Check if the request was successful
        if (response.status === 200) {
            // Parse the response data
            const data = response.data.data;

            // Define theme colors
            const themeColors = {
                title: '#3498db',
                subtitle: '#2ecc71',
                content: '#f39c12',
                highlight: '#f0f0f0',
                negative: '#e74c3c',
                positive: '#2ecc71'
            };

            // Convert RGB values to hexadecimal
            const rgbToHex = (rgb) => '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');

            // Convert theme colors to hexadecimal
            const titleColor = rgbToHex(themeColors.title.match(/\w\w/g).map(hex => parseInt(hex, 16)));
            const subtitleColor = rgbToHex(themeColors.subtitle.match(/\w\w/g).map(hex => parseInt(hex, 16)));
            const contentColor = rgbToHex(themeColors.content.match(/\w\w/g).map(hex => parseInt(hex, 16)));
            const highlightColor = rgbToHex(themeColors.highlight.match(/\w\w/g).map(hex => parseInt(hex, 16)));
            const negativeColor = rgbToHex(themeColors.negative.match(/\w\w/g).map(hex => parseInt(hex, 16)));
            const positiveColor = rgbToHex(themeColors.positive.match(/\w\w/g).map(hex => parseInt(hex, 16)));

            // Create HTML content with styling and colors
            let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Crypto Assets Newsletter</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 20px;
                        background-color: #f8f8f8;
                    }
                    .container {
                        max-width: 80%;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: ${titleColor};
                        text-align: center;
                    }
                    h2 {
                        color: ${subtitleColor};
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: ${highlightColor};
                        color: #333; /* Neutral color for column headers */
                    }
                    th.positive {
                        background-color: ${positiveColor};
                    }
                    th.negative {
                        background-color: ${negativeColor};
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:hover {
                        background-color: #f5f5f5;
                    }
                    .negative {
                        color: ${negativeColor};
                    }
                    .positive {
                        color: ${positiveColor};
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Crypto Assets Newsletter</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Rank</th>
                                <th>Market Cap (USD)</th>
                                <th>Price (USD)</th>
                                <th>Change (24Hr)</th>
                                <th>Volume (USD 24Hr)</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            // Loop through each asset and add it to the HTML content
            data.forEach(asset => {
                // Determine color for change percentage
                const changeColor = parseFloat(asset.changePercent24Hr) >= 0 ? positiveColor : negativeColor;

                htmlContent += `
                            <tr>
                                <td>${asset.name}</td>
                                <td>${asset.symbol}</td>
                                <td>${asset.rank}</td>
                                <td>$${asset.marketCapUsd}</td>
                                <td>$${asset.priceUsd}</td>
                                <td style="color: ${changeColor}">${asset.changePercent24Hr}%</td>
                                <td>$${asset.volumeUsd24Hr}</td>
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
            console.log('Failed to fetch data from API.');
            return defaultHtmlContent
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



module.exports = fetchCryptoAssets