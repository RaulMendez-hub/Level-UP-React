import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CardsMerch } from '../Components/nshared/CardsMerch';

describe('<CardsMerch />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(
      <MemoryRouter>
        <CardsMerch />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /merchandising/i })
    ).toBeInTheDocument();
  });

  it('debe renderizar todos los productos de merchandising con sus respectivos títulos y precios', () => {
    render(
      <MemoryRouter>
        <CardsMerch />
      </MemoryRouter>
    );

    // Títulos de los productos de merch
    const titulos = [
      'Polera Grand Theft Auto VI',
      'Polera PlayStation Logo Clásico',
      'Polerón Cyberpunk 2077',
      'Polerón Minecraft Creeper',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Precios de los productos
    const precios = ['$15.990', '$13.990', '$29.990', '$27.990'];

    precios.forEach((precio) => {
      expect(screen.getByText(precio)).toBeInTheDocument();
    });
  });

  it('debe renderizar los botones de "Añadir al carro" con la ruta correcta hacia /Carro', () => {
    render(
      <MemoryRouter>
        <CardsMerch />
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

  it('debe renderizar las 4 imágenes de los productos de merchandising', () => {
    render(
      <MemoryRouter>
        <CardsMerch />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img', { hidden: true });
    expect(imagenes).toHaveLength(4);
  });
});