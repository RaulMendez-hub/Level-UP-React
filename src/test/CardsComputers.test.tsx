import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CardsComputers } from '../Components/nshared/CardsComputers';

describe('<CardsComputers />', () => {
  it('debe renderizar el título principal de la sección', () => {
    render(
      <MemoryRouter>
        <CardsComputers />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /computadores/i })).toBeInTheDocument();
  });

  it('debe renderizar todas las computadoras con sus respectivos precios y títulos', () => {
    render(
      <MemoryRouter>
        <CardsComputers />
      </MemoryRouter>
    );

    // Títulos esperados
    const titulos = [
      'Notebook ASUS ROG Strix G16',
      'PC Gamer MSI Aegis R2',
      'Notebook Lenovo Legion 5 Pro',
      'PC Gamer HYPERX Predator X',
    ];

    titulos.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Precios esperados
    const precios = ['$1.199.990', '$1.449.990', '$1.299.990', '$2.199.990'];

    precios.forEach((precio) => {
      expect(screen.getByText(precio)).toBeInTheDocument();
    });
  });

  it('debe renderizar los botones de "Añadir al carro" con la ruta correcta hacia /Carro', () => {
    render(
      <MemoryRouter>
        <CardsComputers />
      </MemoryRouter>
    );

    // Buscar todos los enlaces que actúan como botones de añadir al carro
    const botonesCarro = screen.getAllByRole('link', { name: /añadir al carro/i });
    
    // Verificamos que existan 4 botones (uno para cada tarjeta)
    expect(botonesCarro).toHaveLength(4);

    // Verificar que cada enlace apunte a la ruta correcta '/Carro'
    botonesCarro.forEach((boton) => {
      expect(boton).toHaveAttribute('href', '/Carro');
    });
  });

  it('debe renderizar las 4 imágenes de los computadores', () => {
    render(
      <MemoryRouter>
        <CardsComputers />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole('img', { hidden: true });
    expect(imagenes).toHaveLength(4);
  });
});