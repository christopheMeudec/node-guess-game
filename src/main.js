import './style.css';

import { getChatCompletion } from './model.js';

const outputElement = document.getElementById('output');
const formElement = document.getElementById('form');
const queryElement = document.getElementById('query');
const randomElement = document.getElementById('random');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = randomElement.checked ? 'random' : queryElement.value;
  if (!input) return;
  outputElement.innerHTML = '<progress />';
  getChatCompletion(input).then(
    (response) => (outputElement.innerHTML = `<pre>${response}</pre>`)
  );
});
