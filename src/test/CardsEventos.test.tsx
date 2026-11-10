import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardsEventos }  from '../Components/nshared/CardsEventos';

describe('<CardsEventos />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(<CardsEventos />);

    expect(
      screen.getByRole('heading', { level: 1, name: /eventos gaming en chile/i })
    ).toBeInTheDocument();
  });

  it('debe renderizar los títulos de los 3 eventos', () => {
    render(<CardsEventos />);

    const titulos = [
      'Expogame 2026',
      'VALORANT Masters Santiago 2026',
      'Comic Con Chile 2026',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByRole('heading', { level: 5, name: titulo })).toBeInTheDocument();
    });
  });

  it('debe renderizar las imágenes con sus textos descriptivos en el atributo alt', () => {
    render(<CardsEventos />);

    expect(screen.getByAltText('Expogame 2026')).toBeInTheDocument();
    expect(screen.getByAltText('VALORANT Masters Santiago 2026')).toBeInTheDocument();
    expect(screen.getByAltText('Comic Con Chile 2026')).toBeInTheDocument();
  });

  it('debe renderizar los enlaces de ubicación con las URLs de Google Maps correspondientes', () => {
    render(<CardsEventos />);

    const enlacesUbicacion = screen.getAllByRole('link', { name: /ver ubicacion/i });
    expect(enlacesUbicacion).toHaveLength(3);

    // Enlace de Estación Mapocho
    expect(enlacesUbicacion[0]).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/93XRZJe1QZynQJ8P9'
    );

    // Enlaces de Espacio Riesco
    expect(enlacesUbicacion[1]).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/rxfEqv7V98QT8HRZA'
    );
    expect(enlacesUbicacion[2]).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/rxfEqv7V98QT8HRZA'
    );
  });
});