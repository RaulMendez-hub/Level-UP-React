import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Carousel } from '../Components/nshared/Carousel';

describe('<Carousel />', () => {
  it('debe renderizar el título de bienvenida principal', () => {
    render(<Carousel />);

    expect(
      screen.getByRole('heading', { level: 1, name: /bienvenidos a level up/i })
    ).toBeInTheDocument();
  });

  it('debe renderizar todas las imágenes del carrusel con sus respectivos textos alternativos', () => {
    render(<Carousel />);

    // Verificamos cada imagen usando el atributo alt definido en el componente
    expect(screen.getByAltText('Wolverine')).toBeInTheDocument();
    expect(screen.getByAltText('GTA 6')).toBeInTheDocument();
    
    // Como hay dos imágenes con el alt "PC", usamos getAllByAltText para verificar que existan ambas
    const imagenesPc = screen.getAllByAltText('PC');
    expect(imagenesPc).toHaveLength(2);
  });
});