import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { setupSSRMocks } from './ssr-mocks';

export function render() {
  setupSSRMocks();

  try {
    const html = renderToString(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    return { 
      html,
      head: '' // Populate with actual head elements if needed
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      html: '<div>...</div>',
      head: ''
    };
  }
}