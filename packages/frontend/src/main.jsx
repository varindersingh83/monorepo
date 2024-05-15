import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ensure App.jsx includes your component imports and usage
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';  // Make sure this import path is correct
import '../style.css';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
