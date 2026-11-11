import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { carro, pedidos, reiniciarBaseDeDatos, usuarios } from '../js/BaseDeDatos'
import { cerrarSesion, guardarSesion } from '../js/sesion'
import { Checkout } from '../views/Checkout'

const mostrarCheckout = () =>
  render(
    <MemoryRouter initialEntries={['/checkout']}>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/iniciarSesion" element={<h1>Pantalla de login</h1>} />
        <Route path="/Carro" element={<h1>Pantalla del carro</h1>} />
      </Routes>
    </MemoryRouter>,
  )

const entrarComoCliente = () =>
  guardarSesion(usuarios.autenticar('cliente@levelup.cl', 'cliente1234')!, false)

beforeEach(() => {
  reiniciarBaseDeDatos()
  cerrarSesion()
})

describe('<Checkout /> acceso', () => {
  it('sin sesión lleva a iniciar sesión', () => {
    carro.agregar(1)
    mostrarCheckout()
    expect(screen.getByRole('heading', { name: 'Pantalla de login' })).toBeInTheDocument()
  })

  it('con el carro vacío vuelve al carro', () => {
    entrarComoCliente()
    mostrarCheckout()
    expect(screen.getByRole('heading', { name: 'Pantalla del carro' })).toBeInTheDocument()
  })
})

describe('<Checkout /> formulario', () => {
  beforeEach(() => {
    entrarComoCliente()
    carro.agregar(1) // Playstation 5: 799.990
    carro.agregar(2, 2) // XBOX serie X: 679.990 x 2
  })

  it('muestra el resumen del pedido y precarga el nombre y el correo del usuario', () => {
    mostrarCheckout()

    expect(screen.getByRole('heading', { level: 1, name: 'CHECKOUT' })).toBeInTheDocument()
    expect(screen.getByText('Playstation 5 × 1')).toBeInTheDocument()
    expect(screen.getByText('XBOX serie X × 2')).toBeInTheDocument()
    expect(screen.getByText(/^Total/)).toHaveTextContent('Total (3 productos): $2.159.970')
    expect(screen.getByLabelText('Nombre de quien recibe')).toHaveValue('Cliente de prueba')
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('cliente@levelup.cl')
    expect(screen.getByRole('link', { name: 'Volver al carro' })).toHaveAttribute('href', '/Carro')
  })

  it('pide los datos obligatorios que faltan y no crea el pedido', async () => {
    const usuario = userEvent.setup()
    mostrarCheckout()

    await usuario.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(screen.getByText(/teléfono válido/i)).toBeInTheDocument()
    expect(screen.getByText('Selecciona la región.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa la comuna.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa la calle.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa el número.')).toBeInTheDocument()
    expect(screen.getByLabelText('Calle')).toHaveAttribute('aria-invalid', 'true')
    expect(pedidos.leerTodos()).toEqual([])
    expect(carro.leerTodos()).toHaveLength(2)
  })

  it('rechaza un teléfono inválido', async () => {
    const usuario = userEvent.setup()
    mostrarCheckout()

    await usuario.type(screen.getByLabelText('Teléfono'), 'abc')
    await usuario.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(screen.getByText(/teléfono válido/i)).toBeInTheDocument()
    expect(pedidos.leerTodos()).toEqual([])
  })

  it('con los datos de entrega completos confirma el pedido y vacía el carro', async () => {
    const usuario = userEvent.setup()
    mostrarCheckout()

    await usuario.type(screen.getByLabelText('Teléfono'), '+56 9 1234 5678')
    await usuario.selectOptions(screen.getByLabelText('Región'), 'Metropolitana de Santiago')
    await usuario.type(screen.getByLabelText('Comuna'), 'Providencia')
    await usuario.type(screen.getByLabelText('Calle'), 'Av. Providencia')
    await usuario.type(screen.getByLabelText('Número'), '1234')
    await usuario.type(screen.getByLabelText('Departamento o casa (opcional)'), 'Depto 51')
    await usuario.type(screen.getByLabelText('Referencias (opcional)'), 'Timbre del segundo piso')
    await usuario.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    const confirmacion = screen.getByRole('status')
    expect(confirmacion).toHaveTextContent('¡Gracias por tu compra, Cliente de prueba!')
    expect(confirmacion).toHaveTextContent('Tu pedido n.º 1 quedó registrado por $2.159.970.')
    expect(confirmacion).toHaveTextContent(
      'Lo enviaremos a Av. Providencia 1234, Depto 51, Providencia, Metropolitana de Santiago.',
    )
    expect(screen.queryByRole('heading', { name: 'Pantalla del carro' })).not.toBeInTheDocument()

    const [pedido] = pedidos.leerTodos()
    expect(pedido).toMatchObject({ usuarioId: 2, total: 2159970, estado: 'recibido' })
    expect(pedido.entrega).toMatchObject({
      telefono: '+56 9 1234 5678',
      calle: 'Av. Providencia',
      referencias: 'Timbre del segundo piso',
    })
    expect(pedido.items.map((i) => i.nombre)).toEqual(['Playstation 5', 'XBOX serie X'])
    expect(carro.leerTodos()).toEqual([])
  })
})
