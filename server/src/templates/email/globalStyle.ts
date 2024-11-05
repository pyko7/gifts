export const fonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
`

export const globalStyle = `
    * {
      font-family: 'Roboto', serif;
    }

    body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    h1 {
      width: 100%;
      padding: 4rem 0;
      background-color: #262626;
      color: #e5e5e5;
      text-align: center;
    }

    span {
      display: block;
    }

    .container {
      width: 100%;
      height: 100%;
    }

    .button {
      display: block;
      width: fit-content;
      margin: 3rem auto;
      padding: 1rem 0.75rem;
      border-radius: 0.5rem;
      background-color: #262626;
      color: #e5e5e5 !important;
      text-decoration: none;
    }
`
