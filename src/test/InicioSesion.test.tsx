import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InicioSesion } from '../Components/nshared/InicioSesion';

describe('<InicioSesion />', () => {
  it('debe renderizar el título y subtítulo de inicio de sesión', () => {
    render(<InicioSesion />);

    expect(
      screen.getByRole('heading', { level: 1, name: /iniciar sesión/i })
    ).toBeInTheDocument();
    
    expect(
      screen.getByText(/ingresa tus credenciales para continuar/i)
    ).toBeInTheDocument();
  });

  it('debe renderizar los campos de correo electrónico y contraseña con sus atributos correctos', () => {
    render(<InicioSesion />);

    // Verificar el input de correo
    const emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');

    // Verificar el input de contraseña (los inputs de tipo password usan getByLabelText)
    const passwordInput = screen.getByLabelText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
  });

  it('debe renderizar la opción de "Recordarme" y el botón de "Entrar"', () => {
    render(<InicioSesion />);

    // Verificar el checkbox
    const rememberCheckbox = screen.getByRole('checkbox', { name: /recordarme/i });
    expect(rememberCheckbox).toBeInTheDocument();

    // Verificar el botón de submit
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});