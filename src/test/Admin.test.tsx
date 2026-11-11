import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { carro, productos, reiniciarBaseDeDatos, usuarios } from '../js/BaseDeDatos'
import { cerrarSesion, guardarSesion } from '../js/sesion'
import { Admin } from '../views/Admin'

const mostrarAdmin = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/iniciarSesion" element={<h1>Pantalla de login</h1>} />
      </Routes>
    </MemoryRouter>,
  )

const entrarComo = (correo: string, clave: string) =>
  guardarSesion(usuarios.autenticar(correo, clave)!, false)

beforeEach(() => {
  reiniciarBaseDeDatos()
  cerrarSesion()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('<Admin /> acceso', () => {
  it('sin sesión lleva a iniciar sesión', () => {
    mostrarAdmin()
    expect(screen.getByRole('heading', { name: 'Pantalla de login' })).toBeInTheDocument()
  })

  it('un cliente ve acceso restringido y no puede administrar', () => {
    entrarComo('cliente@levelup.cl', 'cliente1234')
    mostrarAdmin()

    expect(screen.getByRole('heading', { name: /acceso restringido/i })).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /crear producto/i })).not.toBeInTheDocument()
  })

  it('el administrador ve el panel con todos los productos', () => {
    entrarComo('admin@levelup.cl', 'admin1234')
    mostrarAdmin()

    expect(screen.getByRole('heading', { name: /panel de administración/i })).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(30) // encabezado + 29 productos
    expect(screen.getByText('Mostrando 29 de 29 productos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Editar Playstation 5' })).toBeInTheDocument()
  })
})

describe('<Admin /> crear', () => {
  beforeEach(() => entrarComo('admin@levelup.cl', 'admin1234'))

  it('crea un producto nuevo y lo muestra en la tabla', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.type(screen.getByLabelText('Nombre'), 'Control DualSense')
    await usuario.selectOptions(screen.getByLabelText('Categoría'), 'accesorios')
    await usuario.type(screen.getByLabelText('Precio (CLP)'), '69990')
    await usuario.type(screen.getByLabelText('Descripción'), 'Control inalámbrico para PS5.')
    await usuario.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(screen.getByRole('status')).toHaveTextContent('Producto «Control DualSense» creado.')
    expect(screen.getByRole('button', { name: 'Editar Control DualSense' })).toBeInTheDocument()
    expect(screen.getByText('$69.990')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveValue('')
    expect(productos.leerTodos()).toHaveLength(30)
    expect(productos.porCategoria('accesorios').map((p) => p.nombre)).toContain('Control DualSense')
  })

  it('muestra el error de la base de datos y no crea nada si faltan datos', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Crear producto' }))
    expect(screen.getByRole('alert')).toHaveTextContent('El campo "nombre" es obligatorio.')

    await usuario.type(screen.getByLabelText('Nombre'), 'Sin precio')
    await usuario.type(screen.getByLabelText('Descripción'), 'Falta el precio.')
    await usuario.click(screen.getByRole('button', { name: 'Crear producto' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/precio/i)

    expect(productos.leerTodos()).toHaveLength(29)
  })
})

describe('<Admin /> actualizar', () => {
  beforeEach(() => entrarComo('admin@levelup.cl', 'admin1234'))

  it('Editar carga el producto en el formulario', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Editar Playstation 5' }))

    expect(screen.getByLabelText('Nombre')).toHaveValue('Playstation 5')
    expect(screen.getByLabelText('Categoría')).toHaveValue('consolas')
    expect(screen.getByLabelText('Precio (CLP)')).toHaveValue(799990)
    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeInTheDocument()
  })

  it('Guardar cambios actualiza el producto, conserva su imagen y refresca la tabla', async () => {
    const usuario = userEvent.setup()
    const imagenOriginal = productos.leerPorId(1)!.imagen
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Editar Playstation 5' }))
    await usuario.clear(screen.getByLabelText('Precio (CLP)'))
    await usuario.type(screen.getByLabelText('Precio (CLP)'), '700000')
    await usuario.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(screen.getByRole('status')).toHaveTextContent('Producto «Playstation 5» actualizado.')
    expect(screen.getByText('$700.000')).toBeInTheDocument()
    expect(productos.leerPorId(1)).toMatchObject({ precio: 700000, imagen: imagenOriginal })
    expect(screen.getByRole('button', { name: 'Crear producto' })).toBeInTheDocument()
  })

  it('un precio inválido al editar muestra el error y no cambia el producto', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Editar Playstation 5' }))
    await usuario.clear(screen.getByLabelText('Precio (CLP)'))
    await usuario.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/precio/i)
    expect(productos.leerPorId(1)!.precio).toBe(799990)
  })

  it('Cancelar edición vacía el formulario', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Editar Playstation 5' }))
    await usuario.click(screen.getByRole('button', { name: 'Cancelar edición' }))

    expect(screen.getByLabelText('Nombre')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Crear producto' })).toBeInTheDocument()
  })
})

describe('<Admin /> eliminar', () => {
  beforeEach(() => entrarComo('admin@levelup.cl', 'admin1234'))

  it('elimina el producto cuando se confirma', async () => {
    const usuario = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Eliminar Playstation 5' }))

    expect(screen.getByRole('status')).toHaveTextContent('Producto «Playstation 5» eliminado.')
    expect(screen.queryByRole('button', { name: 'Editar Playstation 5' })).not.toBeInTheDocument()
    expect(productos.leerPorId(1)).toBeNull()
    expect(screen.getByText('Mostrando 28 de 28 productos')).toBeInTheDocument()
  })

  it('no elimina nada si se cancela la confirmación', async () => {
    const usuario = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Eliminar Playstation 5' }))

    expect(productos.leerPorId(1)).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Editar Playstation 5' })).toBeInTheDocument()
  })

  it('un producto eliminado también sale del carro', async () => {
    const usuario = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    carro.agregar(1)
    mostrarAdmin()

    await usuario.click(screen.getByRole('button', { name: 'Eliminar Playstation 5' }))

    expect(carro.leerTodos()).toEqual([])
  })
})

describe('<Admin /> filtro', () => {
  beforeEach(() => entrarComo('admin@levelup.cl', 'admin1234'))

  it('filtra la tabla por categoría', async () => {
    const usuario = userEvent.setup()
    mostrarAdmin()

    await usuario.selectOptions(screen.getByLabelText('Filtrar por categoría'), 'consolas')

    const filas = screen.getAllByRole('row')
    expect(filas).toHaveLength(5) // encabezado + 4 consolas
    expect(within(filas[1]).getByText('Playstation 5')).toBeInTheDocument()
    expect(screen.getByText('Mostrando 4 de 29 productos')).toBeInTheDocument()
  })
})
