import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #1a8f4c;
    --primary-dark: #156e3a;
    --text-color: #333333;
    --text-light: #666666;
    --background-light: #f8f9fa;
    --white: #ffffff;
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
    --container-width: 1200px;
    --border-radius: 8px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-light);
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
  }

  p {
    margin-bottom: var(--spacing-sm);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    padding: var(--spacing-xl) 0;
  }

  .container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }
`;

export default GlobalStyles;