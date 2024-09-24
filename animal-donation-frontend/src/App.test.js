import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the Home page link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  const linkElement = screen.getByText(/Bem-vindo ao Sistema de Adoção de Animais/i);
  expect(linkElement).toBeInTheDocument();
});
