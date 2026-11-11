import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { carro, reiniciarBaseDeDatos, usuarios } from '../js/BaseDeDatos'
import { cerrarSesion, guardarSesion } from '../js/sesion'
import { Carro } from '../views/Carro'

const mostrarCarro = () =>
  render(
    <MemoryRouter>
      <Carro />
    </MemoryRouter>,
  )

beforeEach(() => {
  reiniciarBaseDeDatos()
  cerrarSesion()
})

describe('<Carro />', () => {
  it('con el carro vacío invita a seguir comprando', () => {
    mostrarCarro()

    expect(screen.getByRole('heading', { level: 1, name: /carro de compras/i })).toBeInTheDocument()
    expect(screen.getByText('Tu carro está vacío.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /seguir comprando/i })).toHaveAttribute('href', '/consolas')
  })

  it('muestra los productos con su cantidad, subtotal y el total', () => {
    carro.agregar(1) // Playstation 5: 799.990
    carro.agregar(2, 2) // XBOX serie X: 679.990 x 2
    mostrarCarro()

    expect(screen.getByRole('heading', { name: 'Playstation 5' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'XBOX serie X' })).toBeInTheDocument()
    expect(screen.getByLabelText('Cantidad de XBOX serie X')).toHaveTextContent('2')
    const subtotales = screen.getAllByText(/^Subtotal/, { selector: 'p' })
    expect(subtotales[0]).toHaveTextContent('Subtotal: $799.990')
    expect(subtotales[1]).toHaveTextContent('Subtotal: $1.359.980')
    expect(screen.getByText(/^Total/)).toHaveTextContent('Total (3 productos): $2.159.970')
  })

  it('el botón + suma una unidad y actualiza el total', async () => {
    carro.agregar(1)
    mostrarCarro()

    await userEvent.click(screen.getByRole('button', { name: 'Agregar una unidad de Playstation 5' }))

    expect(screen.getByLabelText('Cantidad de Playstation 5')).toHaveTextContent('2')
    expect(screen.getByText(/^Total/)).toHaveTextContent('Total (2 productos): $1.599.980')
  })

  it('el botón − resta una unidad y se desactiva cuando queda una', async () => {
    carro.agregar(1, 2)
    mostrarCarro()
    const menos = screen.getByRole('button', { name: 'Quitar una unidad de Playstation 5' })

    await userEvent.click(menos)

    expect(screen.getByLabelText('Cantidad de Playstation 5')).toHaveTextContent('1')
    expect(menos).toBeDisabled()
    expect(screen.getByText(/^Total/)).toHaveTextContent('Total (1 producto): $799.990')
  })

  it('Quitar elimina el producto del carro', async () => {
    carro.agregar(1)
    carro.agregar(2)
    mostrarCarro()

    await userEvent.click(screen.getAllByRole('button', { name: 'Quitar' })[0])

    expect(screen.queryByRole('heading', { name: 'Playstation 5' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'XBOX serie X' })).toBeInTheDocument()
    expect(carro.leerTodos()).toHaveLength(1)
  })

  it('Vaciar carro deja el carro vacío', async () => {
    carro.agregar(1)
    carro.agregar(2)
    mostrarCarro()

    await userEvent.click(screen.getByRole('button', { name: 'Vaciar carro' }))

    expect(screen.getByText('Tu carro está vacío.')).toBeInTheDocument()
    expect(carro.leerTodos()).toEqual([])
  })

  it('se actualiza solo cuando otra pantalla agrega un producto', () => {
    mostrarCarro()
    expect(screen.getByText('Tu carro está vacío.')).toBeInTheDocument()

    act(() => {
      carro.agregar(3)
    })

    expect(screen.getByRole('heading', { name: 'Nintendo Switch 2' })).toBeInTheDocument()
    expect(screen.queryByText('Tu carro está vacío.')).not.toBeInTheDocument()
  })

  it('sin sesión pide iniciar sesión para continuar', () => {
    carro.agregar(1)
    mostrarCarro()

    expect(screen.getByRole('link', { name: /inicia sesión para continuar/i })).toHaveAttribute(
      'href',
      '/iniciarSesion',
    )
    expect(screen.queryByRole('link', { name: /continuar con la compra/i })).not.toBeInTheDocument()
  })

  it('con sesión, Continuar con la compra lleva al checkout', () => {
    guardarSesion(usuarios.autenticar('cliente@levelup.cl', 'cliente1234')!, false)
    carro.agregar(1)
    mostrarCarro()

    expect(screen.getByRole('link', { name: /continuar con la compra/i })).toHaveAttribute('href', '/checkout')
  })
})
