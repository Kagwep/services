const  defaultHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
        }
        .error-container {
            text-align: center;
        }
        .error-message {
            font-size: 24px;
            color: #dc3545;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>Oops!</h1>
        <p class="error-message">Something went wrong.</p>
    </div>
</body>
</html>
`


const services = ['prices','rates','news','airdrops']


module.exports = {
    services,
    defaultHtmlContent
}