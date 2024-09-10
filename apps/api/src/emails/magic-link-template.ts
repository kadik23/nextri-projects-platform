export const getMagicLinkEmailTemplate = ({ token }: { token: string }) => {
  return `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magic Link Email</title>
    <style>
        body {
            background-color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            border: 1px solid #eaeaea;
            border-radius: 8px;
            margin: 40px auto;
            padding: 20px;
            width: 465px;
        }

        .section {
            text-align: center;
            margin: 32px 0;
        }

        .text {
            color: black;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 8px;
        }

        .link {
            color: #2754C5;
            text-decoration: underline;
        }

        .hr {
            border: 1px solid #eaeaea;
            margin: 26px 0;
            width: 100%;
        }

        .footer {
            color: #666666;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
        }

      
    </style>
</head>

<body>
    <div class="container">
      
        <div class="section">
            <p class="text">You're magic link login is below, click to login.</p>
            <p class="text">
                <a href="http://localhost:3001/login/magic/${token}" target="_blank" class="link">
                    Login using Magic Link
                </a>
            </p>
        </div>
        <hr class="hr">
        <p class="footer">© 2024 NEXTRI PROJECTS. All rights reserved.</p>
    </div>
</body>

</html>

        `;
};
