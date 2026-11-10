import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MapaTecnico } from '../Components/nshared/MapaTecnico';

describe('<MapaTecnico />', () => {
  it('debe renderizar el título de Servicio Técnico y la información de atención', () => {
    render(<MapaTecnico />);

    // Verificar el título de la sección técnica
    expect(screen.getByText('Servicio Técnico')).toBeInTheDocument();

    // Verificar los días y horario de atención
    expect(screen.getByText('Atención: Lunes a Viernes')).toBeInTheDocument();
    expect(screen.getByText('9:00 a 18:00')).toBeInTheDocument();
  });

  it('debe renderizar el número de contacto de WhatsApp y el correo electrónico', () => {
    render(<MapaTecnico />);

    // Verificar el número de WhatsApp y su enlace
    const wspLink = screen.getByRole('link', { name: /\+569 66990493/i });
    expect(wspLink).toBeInTheDocument();
    expect(wspLink).toHaveAttribute('href', 'https://wa.me/');

    // Verificar el correo electrónico
    expect(screen.getByText('Correo: Leveluptienda@gmail.com')).toBeInTheDocument();
  });

  it('debe renderizar el mapa incrustado (iframe)', () => {
    render(<MapaTecnico />);

    // En Testing Library, los iframes se pueden encontrar por su rol genérico 'region' o buscando el elemento directamente por tag/clase si no tiene título, 
    // pero podemos usar el selector de contenedor o buscar por etiqueta 'iframe'.
    const iframeElement = document.querySelector('iframe.maps');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'));
  });
});