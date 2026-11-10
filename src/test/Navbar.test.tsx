import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Navbar } from '../Components/shared/Navbar';

// Wrapper auxiliar para proveer el contexto de routing
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Componente Navbar', () => {
  it('renderiza correctamente el logo y los enlaces principales', () => {
    renderWithRouter(<Navbar vcarrito={15000} />);

    // Verifica que exista la imagen del logo por su texto alt
    expect(screen.getByAltText('Logo Empresa')).toBeInTheDocument();

    // Verifica la presencia de los enlaces principales
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /eventos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /servicio tecnico/i })).toBeInTheDocument();
  });

  it('renderiza las opciones dentro del menú desplegable de categorías', () => {
    renderWithRouter(<Navbar vcarrito={0} />);

    expect(screen.getByRole('link', { name: /consolas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /accesorios/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /computadores gamer/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sillas gamer/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /juegos de mesa/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /merch/i })).toBeInTheDocument();
  });

  it('renderiza la barra de búsqueda con el placeholder por defecto y personalizado', () => {
    const { rerender } = renderWithRouter(<Navbar vcarrito={0} />);

    // Placeholder por defecto
    const inputDefault = screen.getByPlaceholderText('Buscar');
    expect(inputDefault).toBeInTheDocument();

    // Placeholder personalizado
    rerender(
      <MemoryRouter>
        <Navbar vcarrito={0} placeholder="Buscar productos..." />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
  });

  it('renderiza las opciones del menú de usuario', () => {
    renderWithRouter(<Navbar vcarrito={0} />);

    expect(screen.getByRole('link', { name: /iniciar sesion/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /registro/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /perfil/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cerrar sesion/i })).toBeInTheDocument();
  });
});