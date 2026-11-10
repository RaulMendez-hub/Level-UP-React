import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CardsJuegosMesa } from '../Components/nshared/CardsJuegosMesa';

describe('<CardsJuegosMesa />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(
      <MemoryRouter>
        <CardsJuegosMesa />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /juegos de mesa/i })
    ).toBeInTheDocument();
  });

  it('debe renderizar todos los juegos de mesa con sus respectivos títulos y precios', () => {
    render(
      <MemoryRouter>
        <CardsJuegosMesa />
      </MemoryRouter>
    );

    // Títulos de los juegos
    const titulos = [
      'Catan',
      'Carcassonne',
      'Dixit',
      'Exploding Kittens',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Precios de los juegos
    const precios = ['$34.990', '$29.990', '$27.990', '$19.990'];

    precios.forEach((precio) => {
      expect(screen.getByText(precio)).toBeInTheDocument();
    });
  });

  it('debe renderizar los botones de "Añadir al carro" con la ruta correcta hacia /Carro', () => {
    render(
      <MemoryRouter>
        <CardsJuegosMesa />
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

  it('debe renderizar las 4 imágenes de los juegos de mesa', () => {
    render(
      <MemoryRouter>
        <CardsJuegosMesa />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img', { hidden: true });
    expect(imagenes).toHaveLength(4);
  });
});