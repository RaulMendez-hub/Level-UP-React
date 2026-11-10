import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CardsConsolas } from '../Components/nshared/CardsConsolas';

describe('<CardsConsolas />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(
      <MemoryRouter>
        <CardsConsolas />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /consolas/i })).toBeInTheDocument();
  });

  it('debe renderizar todas las consolas con sus respectivos títulos y precios', () => {
    render(
      <MemoryRouter>
        <CardsConsolas />
      </MemoryRouter>
    );

    // Títulos de las consolas
    const titulos = [
      'Playstation 5',
      'XBOX serie X',
      'Nintendo Switch 2',
      'Valve Steam Deck Oled',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Precios de las consolas
    const precios = ['$799.990', '$679.990', '$549.900', '$649.990'];

    precios.forEach((precio) => {
      expect(screen.getByText(precio)).toBeInTheDocument();
    });
  });

  it('debe renderizar los botones de "Añadir al carro" con la ruta correcta hacia /Carro', () => {
    render(
      <MemoryRouter>
        <CardsConsolas />
      </MemoryRouter>
    );

    // Buscar todos los enlaces de "Añadir al carro"
    const botonesCarro = screen.getAllByRole('link', { name: /añadir al carro/i });
    
    // Verificamos que existan exactamente 4 botones
    expect(botonesCarro).toHaveLength(4);

    // Verificar que cada enlace apunte a '/Carro'
    botonesCarro.forEach((boton) => {
      expect(boton).toHaveAttribute('href', '/Carro');
    });
  });

  it('debe renderizar las 4 imágenes de las consolas', () => {
    render(
      <MemoryRouter>
        <CardsConsolas />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img', { hidden: true });
    expect(imagenes).toHaveLength(4);
  });
});