import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CardsSillas } from '../Components/nshared/CardsSillas';

describe('<CardsSillas />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(
      <MemoryRouter>
        <CardsSillas />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /sillas gamer/i })
    ).toBeInTheDocument();
  });

  it('debe renderizar todas las sillas gamer con sus respectivos títulos y precios', () => {
    render(
      <MemoryRouter>
        <CardsSillas />
      </MemoryRouter>
    );

    // Títulos de las sillas
    const titulos = [
      'Silla Gamer Secretlab Titan Evo',
      'Silla Gamer Corsair TC200',
      'Silla Gamer Razer Iskur',
      'Silla Gamer Cougar Armor One',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Precios de las sillas
    const precios = ['$399.990', '$249.990', '$329.990', '$159.990'];

    precios.forEach((precio) => {
      expect(screen.getByText(precio)).toBeInTheDocument();
    });
  });

  it('debe renderizar los botones de "Añadir al carro" con la ruta correcta hacia /Carro', () => {
    render(
      <MemoryRouter>
        <CardsSillas />
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

  it('debe renderizar las 4 imágenes de las sillas gamer', () => {
    render(
      <MemoryRouter>
        <CardsSillas />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img', { hidden: true });
    expect(imagenes).toHaveLength(4);
  });
});