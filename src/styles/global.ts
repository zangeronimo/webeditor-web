import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;

    --blue-500: #0d6efd;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
    transition-delay: 9999s;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  *{
    box-sizing: border-box;
    outline: 0;
  }

  a {
    color: var(---gray-700);
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    filter: brightness(20%);
  }

  html {
    width: 100vw;
    height: 100vh;
  }

  body {
    background: #fff;
    color: var(--gray-800);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .page-content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
