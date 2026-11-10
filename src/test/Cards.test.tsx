import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Cards } from '../Components/nshared/Cards';

describe('<Cards />', () => {
  it('debe renderizar todas las tarjetas con sus respectivos títulos y textos', () => {
    render(<Cards />);

    // Lista para verificar que el componente carga los datos
    const titulosEsperados = [
      'Grand Theft Auto VI',
      'Kojima VS PlayStation',
      '¿La IA puede acabar con la humanidad?',
      'Silent Hill: Townfall',
      "Marvel's Wolverine ya está disponible",
      'The Witcher 3 recibe un remaster gratuito',
      'Blizzard confirma Diablo V',
      'Zelda: Ocarina of Time Remake tiene fecha',
      'Control: Resonant llega el mismo día que Silent Hill',
    ];

    // Verificar que cada título esté presente en el documento
    titulosEsperados.forEach((titulo) => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });
  });

  it('debe renderizar todas las imágenes de las tarjetas', () => {
    render(<Cards />);

    // Como todas las imágenes comparten el mismo alt="Card image cap", podemos buscarlas todas
    const imagenes = screen.getAllByRole('img', { hidden: true });
    
    // Verificamos que existan exactamente las 9 imágenes de las tarjetas
    expect(imagenes).toHaveLength(9);
  });
});