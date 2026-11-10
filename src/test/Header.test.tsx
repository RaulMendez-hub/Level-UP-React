import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../Components/shared/Header';

describe('<Header />', () => {
  it('debe renderizar la información de contacto y la ubicación correctamente', () => {
    render(<Header />);

    // Verificar el número de WhatsApp y su enlace
    const wspLink = screen.getByRole('link', { name: /\+569 669 90 493/i });
    expect(wspLink).toBeInTheDocument();
    expect(wspLink).toHaveAttribute('href', 'https://wa.me/');

    // Verificar el correo electrónico
    expect(screen.getByText('Leveluptienda@gmail.com')).toBeInTheDocument();

    // Verificar la ubicación
    expect(screen.getByText('San Bernardo, Santiago Chile')).toBeInTheDocument();

  });
});