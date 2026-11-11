//BASE DE DATOS
import imgPs5 from '../image/ps5.webp'
import imgXbox from '../image/xbox.webp'
import imgSwitch from '../image/switch.webp'
import imgDeck from '../image/deck.webp'
import imgHeadset from '../image/headset.webp'
import imgTeclado from '../image/teclado.webp'
import imgMicrofono from '../image/microfono.webp'
import imgVolante from '../image/volante.jpeg'
import imgBaseEnfriamiento from '../image/base-enfriamiento.webp'
import imgLogitech from '../image/logitech.webp'
import imgRazermouse from '../image/razermouse.jpeg'
import imgPadsteed from '../image/padsteed.webp'
import imgPadrazer from '../image/padrazer.jpeg'
import imgNoteAsus from '../image/note-asus.jpeg'
import imgComputador from '../image/computador.jpg'
import imgLegion from '../image/legion.webp'
import imgHyperpc from '../image/hyperpc.webp'
import imgSilla from '../image/silla.jpg'
import imgSillacorsair from '../image/sillacorsair.webp'
import imgRazer from '../image/razer.jpeg'
import imgArmor from '../image/armor.png'
import imgCatran from '../image/catran.jpeg'
import imgCarcassonne from '../image/carcassonne.webp'
import imgDixit from '../image/dixit.jpeg'
import imgKittens from '../image/kittens.jpeg'
import imgPoleragta6 from '../image/poleragta6.webp'
import imgPoleraplay from '../image/poleraplay.jpeg'
import imgPoleroncyber from '../image/poleroncyber.png'
import imgPoleronmine from '../image/poleronmine.jpeg'
import imgCards1 from '../image/cards1.jpeg'
import imgKojimacard from '../image/kojimacard.jpg'
import imgCoxoncard from '../image/coxoncard.jpg'
import imgTownfallcard from '../image/townfallcard.jpg'
import imgWolverinecard from '../image/wolverinecard.webp'
import imgWitcher3card from '../image/witcher3card.jpg'
import imgDiablo5card from '../image/diablo5card.jpg'
import imgZeldaoot from '../image/zeldaoot.jpeg'
import imgControlcard from '../image/controlcard.avif'
import imgExpogame from '../image/expogame.jpeg'
import imgValorant from '../image/valorant.jpeg'
import imgComicCon from '../image/Comic-Con.jpg'

/**
 * @typedef {'consolas'|'accesorios'|'computadores'|'sillas'|'juegosMesa'|'merch'} Categoria
 * @typedef {{ id: number, categoria: Categoria, nombre: string, descripcion: string, precio: number, imagen?: string }} Producto
 * @typedef {{ id: number, nombre: string, descripcion: string, fechaInicio: string, fechaFin: string, fechaTexto?: string, lugar: string, urlUbicacion?: string, imagen?: string }} Evento
 * @typedef {{ id: number, titulo: string, descripcion: string, imagen?: string }} Noticia
 * @typedef {'administrador'|'cliente'} Rol
 * @typedef {{ id: number, nombre: string, email: string, rol: Rol }} Usuario
 * @typedef {Usuario & { password: string }} UsuarioAlmacenado
 * @typedef {{ id: number, productoId: number, cantidad: number }} ItemCarro
 * @typedef {{ nombre: string, email: string, telefono: string, region: string, comuna: string, calle: string, numero: string, departamento?: string, referencias?: string }} DatosEntrega
 * @typedef {{ productoId: number, nombre: string, precio: number, cantidad: number, subtotal: number }} ItemPedido
 * @typedef {{ id: number, usuarioId: number, fecha: string, estado: string, items: ItemPedido[], total: number, entrega: DatosEntrega }} Pedido
 */


//  Utilidades


/** Categorías de producto. Las claves coinciden con las rutas de la app (/consolas, /juegosMesa...). */
export const CATEGORIAS = Object.freeze({
  consolas: 'Consolas',
  accesorios: 'Accesorios',
  computadores: 'Computadores Gamer',
  sillas: 'Sillas Gamer',
  juegosMesa: 'Juegos de mesa',
  merch: 'Merch',
})

/** Roles de usuario. */
export const ROLES = Object.freeze({
  administrador: 'Administrador',
  cliente: 'Cliente',
})

/** Regiones de Chile, para el formulario de entrega. */
export const REGIONES = Object.freeze([
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  'Libertador General Bernardo O’Higgins',
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén del General Carlos Ibáñez del Campo',
  'Magallanes y de la Antártica Chilena',
])

const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

/** Da formato de pesos chilenos: 799990 -> "$799.990". */
export const formatearPrecio = (valor) => formatoCLP.format(valor)

/** Minúsculas y sin tildes, para búsquedas. */
const normalizar = (texto) =>
  String(texto)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const exigirTexto = (valor, campo) => {
  if (typeof valor !== 'string' || valor.trim() === '') {
    throw new Error(`El campo "${campo}" es obligatorio.`)
  }
}

const exigirCantidad = (cantidad) => {
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new Error('La cantidad debe ser un número entero mayor o igual a 1.')
  }
}


//  Fábrica de colecciones (CRUD)


/**
 * Crea una colección en memoria con las operaciones CRUD.
 *
 * @template {{ id: number }} T  
 * @template [V=T]              
 * @param {string} nombre
 * @param {T[]} datosIniciales  
 * @param {object} [opciones]
 * @param {(registro: T, otros: T[]) => void} [opciones.validar]
 *       
 * @param {string[]} [opciones.ocultar]
 *        
 */
const crearColeccion = (nombre, datosIniciales, { validar, ocultar = [] } = {}) => {
  const copiarIniciales = () => datosIniciales.map((registro) => ({ ...registro }))
  const calcularSiguienteId = (lista) => lista.reduce((max, r) => Math.max(max, r.id), 0) + 1

  let registros = copiarIniciales()
  let siguienteId = calcularSiguienteId(registros)

  // Aviso de cambios: permite que la pantalla se actualice sola (ver useCarro.ts)
  const oyentes = new Set()
  let version = 0
  const avisarCambio = () => {
    version += 1
    oyentes.forEach((oyente) => oyente())
  }

  /** Entrega una copia profunda (sin campos ocultos) para que nadie modifique el original. */
  const exponer = (registro) => {
    const copia = structuredClone(registro)
    ocultar.forEach((campo) => delete copia[campo])
    return /** @type {V} */ (/** @type {unknown} */ (copia))
  }

  const buscarIndice = (id) => registros.findIndex((r) => r.id === Number(id))

  const validarRegistro = (registro) =>
    validar?.(registro, registros.filter((r) => r.id !== registro.id))

  return {
    nombre,

    /** CREATE: agrega un registro. El id siempre se genera automáticamente. */
    crear(/** @type {Omit<T, 'id'>} */ datos) {
      const nuevo = /** @type {T} */ (structuredClone({ ...datos, id: siguienteId }))
      validarRegistro(nuevo)
      registros.push(nuevo)
      siguienteId += 1
      avisarCambio()
      return exponer(nuevo)
    },

    /**
     * READ: lista los registros. `filtro` es una función (registro) => boolean.
     * @param {(registro: T) => boolean} [filtro]
     */
    leerTodos(filtro) {
      const lista = typeof filtro === 'function' ? registros.filter(filtro) : registros
      return lista.map(exponer)
    },

    /** READ: busca un registro por id (acepta número o texto, como el de la URL). */
    leerPorId(/** @type {number | string} */ id) {
      const registro = registros[buscarIndice(id)]
      return registro ? exponer(registro) : null
    },

    /** UPDATE: modifica solo los campos indicados. El id no se puede cambiar. */
    actualizar(/** @type {number | string} */ id, /** @type {Partial<Omit<T, 'id'>>} */ cambios) {
      const indice = buscarIndice(id)
      if (indice === -1) return null
      const actualizado = structuredClone({ ...registros[indice], ...cambios, id: registros[indice].id })
      validarRegistro(actualizado)
      registros[indice] = actualizado
      avisarCambio()
      return exponer(actualizado)
    },

    /** DELETE: elimina un registro y lo devuelve (o null si no existía). */
    eliminar(/** @type {number | string} */ id) {
      const indice = buscarIndice(id)
      if (indice === -1) return null
      const [eliminado] = registros.splice(indice, 1)
      avisarCambio()
      return exponer(eliminado)
    },

    /** Restaura los datos iniciales (útil para pruebas). */
    reiniciar() {
      registros = copiarIniciales()
      siguienteId = calcularSiguienteId(registros)
      avisarCambio()
    },

    /** Avisa cada vez que los datos cambian. Devuelve la función para dejar de escuchar. */
    suscribir(/** @type {() => void} */ oyente) {
      oyentes.add(oyente)
      return () => {
        oyentes.delete(oyente)
      }
    },

    /** Número que sube con cada cambio (sirve para saber si hay datos nuevos). */
    version() {
      return version
    },
  }
}


//  DATOS


/** @type {Producto[]} */
const PRODUCTOS_INICIALES = [
  {
    id: 1,
    categoria: 'consolas',
    nombre: 'Playstation 5',
    descripcion: 'Experimenta el futuro de los videojuegos con la PS5. Disfruta de tiempos de carga ultrarrápidos gracias a su SSD de alta velocidad con 1 TB de capacidad, y sumérgete en una experiencia única con respuesta háptica, gatillos adaptativos y audio 3D que te acercan más que nunca a la acción. Este bundle incluye dos juegos físicos de regalo: Astro Bot + Gran Turismo 7, para que disfrutes de títulos exclusivos y de alta calidad de inmediato. La tecnología ultrarrápida asegura una experiencia de juego fluida, manteniendo el ritmo con cada acción, mientras que los detalles gráficos impresionantes y el audio de 360 grados te colocan en el centro del juego. Además, la PS5 es totalmente compatible con tu biblioteca de juegos de PS4 y te da acceso a juegos on-demand a través de PlayStation Plus, con una vasta selección que se actualiza cada mes. Aclaración: No incluye unidad óptica de disco. Esta puede adquirirse por separado y acoplarse a la consola.',
    precio: 799990,
    imagen: imgPs5,
  },
  {
    id: 2,
    categoria: 'consolas',
    nombre: 'XBOX serie X',
    descripcion: 'La Xbox Series X se posiciona como una estrategia formidable y el pináculo del entretenimiento en casa. Diseñada para los jugadores más exigentes que buscan la mejor calidad de juego, ofrece una combinación imponente de velocidad, rendimiento inigualable y tecnología de vanguardia para dominar la próxima generación de consolas. Equipada con un procesador personalizado de 7 nm que aprovecha las eficientes microarquitecturas Zen 2 y RDNA 2 de AMD, proporciona una experiencia excepcionalmente fluida. Su asombroso diseño garantiza una respuesta ágil en los juegos más exigentes, estableciendo un nuevo estándar indiscutible en términos de potencia, gráficos y velocidad de carga.',
    precio: 679990,
    imagen: imgXbox,
  },
  {
    id: 3,
    categoria: 'consolas',
    nombre: 'Nintendo Switch 2',
    descripcion: 'Nintendo Switch 2 es la próxima generación de consolas híbridas de Nintendo, combinando juego portátil y de sobremesa con un rendimiento significativamente mejorado. Ofrece gráficos de alta definición, mayor velocidad de carga y retrocompatibilidad con títulos de Switch original. Con un diseño renovado y soporte para juegos exclusivos, promete revolucionar la experiencia gamer. ¡Prepárate para jugar como nunca antes!',
    precio: 549900,
    imagen: imgSwitch,
  },
  {
    id: 4,
    categoria: 'consolas',
    nombre: 'Valve Steam Deck Oled',
    descripcion: 'El salto a la tecnología OLED lo cambia absolutamente todo. La Valve Steam Deck OLED no es solo una simple actualización de pantalla; es una reinvención magistral del dispositivo portátil para PC más aclamado del mundo. Con una nueva APU de 6nm infinitamente más eficiente, una batería de mayor capacidad y conectividad ultrarrápida, disfrutarás de sesiones de juego mucho más largas, descargas fugaces y un dispositivo notablemente más ligero y fresco en tus manos. Tu biblioteca de Steam nunca se vio tan bien.',
    precio: 649990,
    imagen: imgDeck,
  },
  {
    id: 5,
    categoria: 'accesorios',
    nombre: 'Audífonos HyperX Cloud III',
    descripcion: 'Sumérgete por completo en cada partida con los HyperX Cloud III, diseñados para sesiones de juego prolongadas gracias a su espuma de memoria premium y diadema de acero reforzado. Su driver de 53mm entrega graves profundos y agudos nítidos, mientras que el micrófono desmontable con cancelación de ruido asegura una comunicación clara con tu equipo. Compatible con PS5, Xbox Series X|S, Nintendo Switch y PC mediante conexión de 3.5mm, este headset es la opción ideal para quienes buscan calidad de audio profesional sin sacrificar comodidad. Su diseño ergonómico y materiales resistentes garantizan durabilidad partida tras partida.',
    precio: 79990,
    imagen: imgHeadset,
  },
  {
    id: 6,
    categoria: 'accesorios',
    nombre: 'Teclado Mecánico Logitech G Pro X',
    descripcion: 'Lleva tu precisión al siguiente nivel con el Logitech G Pro X, un teclado mecánico compacto de formato TKL pensado para esports. Sus switches intercambiables en caliente te permiten personalizar la sensación de cada tecla sin necesidad de herramientas ni soldaduras. Construido con una placa superior de aluminio resistente y retroiluminación RGB LIGHTSYNC totalmente programable, combina estilo y rendimiento. Su diseño sin números facilita más espacio para el mouse, ideal para configuraciones competitivas de alto nivel.',
    precio: 99990,
    imagen: imgTeclado,
  },
  {
    id: 7,
    categoria: 'accesorios',
    nombre: 'Micrófono HyperX QuadCast S',
    descripcion: 'El HyperX QuadCast S ofrece captura de audio de estudio gracias a sus cuatro patrones polares seleccionables, ideales tanto para streaming en solitario como para podcasts grupales. Su montaje antichoque incorporado reduce las vibraciones y golpes del escritorio, evitando ruidos no deseados en la grabación. Cuenta con iluminación RGB personalizable y un control táctil de silencio en la parte superior, además de un filtro anti-pop integrado que mejora la claridad de la voz sin necesidad de accesorios adicionales.',
    precio: 119990,
    imagen: imgMicrofono,
  },
  {
    id: 8,
    categoria: 'accesorios',
    nombre: 'Volante Logitech G29 Driving Force',
    descripcion: 'El Logitech G29 lleva la simulación de carreras a otro nivel con retroalimentación de fuerza realista que responde a cada curva y superficie del circuito. Su construcción combina acero inoxidable y cuero cosido a mano en el volante, entregando una sensación premium en cada vuelta. Incluye pedalera de tres pedales con resortes ajustables y es compatible con PS5, PS4 y PC, permitiéndote alternar entre plataformas sin perder la calidad de conducción que caracteriza a la serie G.',
    precio: 249990,
    imagen: imgVolante,
  },
  {
    id: 9,
    categoria: 'accesorios',
    nombre: 'Base de Enfriamiento para PS5/Xbox',
    descripcion: 'Mantén tu consola funcionando a temperaturas óptimas con esta base de enfriamiento equipada con tres ventiladores silenciosos de alta capacidad. Su diseño vertical ahorra espacio en tu mueble mientras mejora la circulación de aire durante sesiones de juego prolongadas. Incluye puertos USB adicionales y compartimentos para almacenar hasta cuatro controles, convirtiéndose en una solución integral tanto para el rendimiento térmico como para el orden de tu setup.',
    precio: 34990,
    imagen: imgBaseEnfriamiento,
  },
  {
    id: 10,
    categoria: 'accesorios',
    nombre: 'Mouse Logitech G502 X Plus',
    descripcion: 'El Logitech G502 X Plus incorpora switches ópticos LIGHTFORCE que eliminan por completo el rebote de clics, junto a un sensor HERO 25K capaz de alcanzar hasta 25.600 DPI con una precisión prácticamente perfecta. Su conectividad inalámbrica LIGHTSPEED asegura una respuesta sin latencia perceptible. Cuenta con iluminación RGB LIGHTSYNC personalizable, rueda de desplazamiento híbrida con modo libre y bloqueado, y hasta 13 botones programables, ofreciendo un control total para quienes buscan personalizar cada acción en juego.',
    precio: 99990,
    imagen: imgLogitech,
  },
  {
    id: 11,
    categoria: 'accesorios',
    nombre: 'Mouse Razer DeathAdder V3 Pro',
    descripcion: 'El Razer DeathAdder V3 Pro mantiene la icónica forma ergonómica que lo hizo popular entre millones de jugadores, ahora con un peso de apenas 63 gramos y sensor óptico Focus Pro 30K que ofrece una precisión de nivel profesional en cada movimiento. Su conexión inalámbrica HyperSpeed Wireless de segunda generación elimina la latencia frente al cableado, mientras que su batería de hasta 90 horas y switches ópticos de tercera generación lo convierten en una herramienta confiable para largas jornadas competitivas.',
    precio: 149990,
    imagen: imgRazermouse,
  },
  {
    id: 12,
    categoria: 'accesorios',
    nombre: 'Mousepad SteelSeries QcK Prism XL',
    descripcion: 'El QcK Prism XL cubre todo tu escritorio con una superficie de tela optimizada para sensores ópticos de alta precisión, garantizando un deslizamiento constante en cada movimiento. Su base antideslizante de goma mantiene el mousepad firme incluso en los momentos de mayor tensión. Incorpora iluminación RGB perimetral personalizable que se sincroniza con el resto de tu setup, transformando tu espacio de juego en una experiencia visual tan inmersiva como funcional.',
    precio: 49990,
    imagen: imgPadsteed,
  },
  {
    id: 13,
    categoria: 'accesorios',
    nombre: 'Mousepad Razer Gigantus V2 XXL',
    descripcion: 'El Razer Gigantus V2 en su versión XXL ofrece una superficie extendida que cubre teclado y mouse simultáneamente, con una tela microtejida que combina control y velocidad para adaptarse a distintos estilos de juego. Sus costuras cosidas evitan el deshilachado con el uso prolongado. Su base de goma natural antideslizante asegura que el mousepad permanezca en su lugar durante las sesiones más intensas, mientras que su grosor uniforme entrega una superficie de deslizamiento consistente de borde a borde.',
    precio: 29990,
    imagen: imgPadrazer,
  },
  {
    id: 14,
    categoria: 'computadores',
    nombre: 'Notebook ASUS ROG Strix G16',
    descripcion: 'El ASUS ROG Strix G16 combina un procesador Intel Core i7 de última generación con una tarjeta gráfica NVIDIA GeForce RTX 4060, entregando el rendimiento necesario para correr los títulos más exigentes en alta resolución y con ray tracing activado. Su pantalla de 16" con 165Hz de tasa de refresco y su sistema de refrigeración ROG Intelligent Cooling mantienen temperaturas óptimas incluso en sesiones de juego prolongadas, mientras que 16GB de RAM y un SSD de 1TB aseguran cargas rápidas y multitarea sin trabas.',
    precio: 1199990,
    imagen: imgNoteAsus,
  },
  {
    id: 15,
    categoria: 'computadores',
    nombre: 'PC Gamer MSI Aegis R2',
    descripcion: 'El MSI Aegis R2 llega listo para competir con un procesador Intel Core i5 de 12va generación y una tarjeta gráfica NVIDIA GeForce RTX 4070, ideal para gaming en 1440p con configuraciones gráficas al máximo. Su gabinete con panel lateral de vidrio templado permite lucir la iluminación RGB Mystic Light interna, mientras que 16GB de RAM DDR5 y un SSD NVMe de 1TB garantizan una experiencia fluida tanto en juegos como en tareas de streaming simultáneas.',
    precio: 1449990,
    imagen: imgComputador,
  },
  {
    id: 16,
    categoria: 'computadores',
    nombre: 'Notebook Lenovo Legion 5 Pro',
    descripcion: 'El Lenovo Legion 5 Pro está equipado con un procesador AMD Ryzen 7 y una GPU NVIDIA GeForce RTX 4060, ofreciendo un equilibrio excelente entre potencia gráfica y eficiencia energética para sesiones de juego largas sin comprometer el rendimiento. Su pantalla QHD de 16" con 165Hz y calibración de fábrica para color preciso lo hace igual de atractivo para diseño y edición, mientras que su teclado retroiluminado RGB por zonas y bisagras reforzadas soportan el uso intensivo diario.',
    precio: 1299990,
    imagen: imgLegion,
  },
  {
    id: 17,
    categoria: 'computadores',
    nombre: 'PC Gamer HYPERX Predator X',
    descripcion: 'Pensado para quienes buscan máximo rendimiento sin límites, el HYPERX Predator X integra un procesador Intel Core i9 junto a una tarjeta gráfica NVIDIA GeForce RTX 4080, capaz de mover los títulos más exigentes en 4K con trazado de rayos activado. Cuenta con 32GB de RAM DDR5, un SSD NVMe de 2TB y un sistema de refrigeración líquida AIO de 240mm que mantiene el equipo estable incluso en las sesiones de overclocking más demandantes, todo dentro de un gabinete con flujo de aire optimizado.',
    precio: 2199990,
    imagen: imgHyperpc,
  },
  {
    id: 18,
    categoria: 'sillas',
    nombre: 'Silla Gamer Secretlab Titan Evo',
    descripcion: 'Diseñada en colaboración con especialistas en ergonomía, la Secretlab Titan Evo se adapta a tu cuerpo con un sistema de soporte lumbar integrado y espuma de enfriamiento que mantiene la frescura durante largas sesiones. Su estructura de acero reforzado soporta hasta 130kg sin perder estabilidad. Los reposabrazos 4D magnéticos y la reclinación de hasta 165° te permiten encontrar la posición perfecta tanto para jugar como para tomar un descanso, mientras que su tapizado de cuero sintético premium resiste el desgaste diario.',
    precio: 399990,
    imagen: imgSilla,
  },
  {
    id: 19,
    categoria: 'sillas',
    nombre: 'Silla Gamer Corsair TC200',
    descripcion: 'La Corsair TC200 combina un tapizado de tela transpirable con un armazón de acero de alta densidad, ideal para quienes pasan largas horas frente al computador y buscan mantenerse frescos incluso en climas cálidos. Su cojín lumbar y cervical desmontables permiten personalizar el soporte según tu postura. Cuenta con reposabrazos 4D ajustables en altura, ancho, profundidad y rotación, además de un mecanismo de reclinación de hasta 160° y base de aluminio reforzada que garantiza estabilidad y durabilidad en el tiempo.',
    precio: 249990,
    imagen: imgSillacorsair,
  },
  {
    id: 20,
    categoria: 'sillas',
    nombre: 'Silla Gamer Razer Iskur',
    descripcion: 'La Razer Iskur fue diseñada desde cero pensando en la salud postural, incorporando un soporte lumbar curvo integrado que se ajusta a la forma natural de tu columna sin necesidad de cojines adicionales. Su espuma multicapa de alta densidad conserva su firmeza incluso tras años de uso intensivo. Ofrece reposabrazos multidireccionales de espuma acolchada, reclinación ajustable hasta 152° y un revestimiento sintético resistente al desgaste, todo bajo el característico diseño negro con acentos verdes de la marca.',
    precio: 329990,
    imagen: imgRazer,
  },
  {
    id: 21,
    categoria: 'sillas',
    nombre: 'Silla Gamer Cougar Armor One',
    descripcion: 'La Cougar Armor One es una opción robusta y accesible, construida con una carcasa de alta resistencia y un tapizado de cuero PU que facilita la limpieza diaria. Su respaldo reclinable hasta 180° la convierte en una alternativa versátil tanto para gaming intenso como para descansar entre partidas. Incluye cojines lumbar y cervical de espuma viscoelástica, reposabrazos 2D ajustables en altura y una base de cinco ruedas de nylon silenciosas, pensada para quienes buscan calidad y comodidad sin un desembolso excesivo.',
    precio: 159990,
    imagen: imgArmor,
  },
  {
    id: 22,
    categoria: 'juegosMesa',
    nombre: 'Catan',
    descripcion: 'Catan es el clásico juego de estrategia y comercio donde cada jugador construye asentamientos, ciudades y rutas en la isla de Catán, intercambiando recursos como madera, ladrillo, trigo, lana y mineral para expandir su territorio. Su sistema de tablero modular hace que cada partida sea distinta a la anterior. Pensado para 3 a 4 jugadores (ampliable a 6 con expansión), combina negociación, planificación y un poco de suerte con los dados, convirtiéndolo en una opción ideal tanto para principiantes como para jugadores experimentados en juegos de mesa modernos.',
    precio: 34990,
    imagen: imgCatran,
  },
  {
    id: 23,
    categoria: 'juegosMesa',
    nombre: 'Carcassonne',
    descripcion: 'En Carcassonne los jugadores construyen un paisaje medieval colocando fichas de terreno con ciudades, caminos, monasterios y campos, para luego posicionar a sus "seguidores" y reclamar puntos según cómo se desarrolle el mapa compartido. Ninguna partida se repite, ya que el tablero se crea sobre la marcha. Con reglas simples de aprender pero con profundidad estratégica en la gestión de seguidores, es perfecto para 2 a 5 jugadores y se ha convertido en uno de los juegos de mesa alemanes más premiados e influyentes de las últimas décadas.',
    precio: 29990,
    imagen: imgCarcassonne,
  },
  {
    id: 24,
    categoria: 'juegosMesa',
    nombre: 'Dixit',
    descripcion: 'Dixit invita a los jugadores a interpretar ilustraciones oníricas y evocadoras a través de una palabra, frase o sonido que las describa, mientras el resto intenta adivinar cuál de las cartas mostradas corresponde a la pista dada. La clave está en encontrar el equilibrio entre ser demasiado obvio o demasiado ambiguo. Con sus hermosas cartas ilustradas y mecánicas simples de narrativa y deducción, es ideal para grupos de 3 a 6 jugadores que buscan una experiencia creativa, divertida y distinta en cada sesión, apta para todas las edades.',
    precio: 27990,
    imagen: imgDixit,
  },
  {
    id: 25,
    categoria: 'juegosMesa',
    nombre: 'Exploding Kittens',
    descripcion: 'Exploding Kittens es un juego de cartas rápido y desopilante donde los jugadores van robando cartas del mazo intentando evitar sacar un "gato explosivo" que los elimine de la partida. Cartas especiales permiten esquivar el desastre, saltarse turnos o espiar el mazo antes de robar. Con partidas de corta duración y su característico humor absurdo ilustrado, funciona perfecto para grupos de 2 a 5 jugadores que buscan algo ágil, tenso y muy entretenido para romper el hielo o cerrar una noche de juegos.',
    precio: 19990,
    imagen: imgKittens,
  },
  {
    id: 26,
    categoria: 'merch',
    nombre: 'Polera Grand Theft Auto VI',
    descripcion: 'Polera confeccionada en algodón peinado 100%, con estampado de alta definición inspirado en el arte oficial de Grand Theft Auto VI. Su tela de gramaje medio ofrece comodidad durante todo el día sin perder forma tras múltiples lavados. Disponible en tallas S a XXL con corte unisex, es la prenda ideal para los fanáticos que ya cuentan los días para el lanzamiento del juego más esperado de la industria.',
    precio: 15990,
    imagen: imgPoleragta6,
  },
  {
    id: 27,
    categoria: 'merch',
    nombre: 'Polera PlayStation Logo Clásico',
    descripcion: 'Con el icónico logo de PlayStation estampado al frente, esta polera de algodón suave combina un diseño minimalista con la nostalgia de la marca que marcó a generaciones de jugadores. Su serigrafía de alta durabilidad resiste el uso y lavado frecuente sin agrietarse. Un básico infaltable para cualquier fanático de la marca, perfecta para combinar con jeans o shorts en el día a día o para lucir en juntas gamer y convenciones.',
    precio: 13990,
    imagen: imgPoleraplay,
  },
  {
    id: 28,
    categoria: 'merch',
    nombre: 'Polerón Cyberpunk 2077',
    descripcion: 'Este polerón con capucha presenta el logo de Cyberpunk 2077 en un diseño bordado de alta resistencia, sobre una tela polar interior que brinda abrigo y suavidad incluso en los días más fríos. Su cierre frontal y bolsillo canguro suman comodidad y funcionalidad. Fabricado en una mezcla de algodón y poliéster que evita el desgaste prematuro, es la prenda perfecta para los fans de Night City que buscan destacar con un estilo urbano y gamer a la vez.',
    precio: 29990,
    imagen: imgPoleroncyber,
  },
  {
    id: 29,
    categoria: 'merch',
    nombre: 'Polerón Minecraft Creeper',
    descripcion: 'Con la icónica cara del Creeper estampada en el pecho, este polerón de tela afelpada por dentro combina comodidad y un diseño reconocible al instante por cualquier fanático de Minecraft. Su capucha ajustable y puños elásticos ayudan a mantener el calor en cualquier estación. Disponible en tallas para adolescentes y adultos, es una opción ideal tanto para el uso diario como para regalar a los seguidores más fieles del universo de bloques más famoso de los videojuegos.',
    precio: 27990,
    imagen: imgPoleronmine,
  },
]

/** @type {Evento[]} */
const EVENTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Expogame 2026',
    descripcion: 'La feria de videojuegos, streaming y cultura pop más grande de Chile vuelve a Santiago en su decimonovena edición, bajo el concepto "Más allá del juego". Contará con zonas gamificadas donde los asistentes podrán acumular Cristales Expogame y canjear premios a través del Pasaporte Expogame, además del torneo competitivo Expogame Champions. Como invitados estelares se presentarán el streamer mexicano El Mariana y el artista español Keyblade, con shows en vivo cargados de música y referencias gamer.',
    fechaInicio: '2026-10-02',
    fechaFin: '2026-10-04',
    fechaTexto: '2, 3 y 4 de octubre de 2026',
    lugar: 'Centro Cultural Estación Mapocho, Santiago',
    urlUbicacion: 'https://maps.app.goo.gl/93XRZJe1QZynQJ8P9',
    imagen: imgExpogame,
  },
  {
    id: 2,
    nombre: 'VALORANT Masters Santiago 2026',
    descripcion: 'El primer Masters internacional de la Valorant Champions Tour disputado en Sudamérica se realizó en el Espacio Riesco, reuniendo a doce equipos provenientes de las principales ligas del circuito (Americas, EMEA, Pacific y China) con una bolsa de premios de un millón de dólares. El equipo RedForce se coronó campeón tras vencer a Paper Rex en la gran final, consolidando a Santiago como un nuevo epicentro de los esports a nivel mundial.',
    fechaInicio: '2026-02-28',
    fechaFin: '2026-03-15',
    fechaTexto: '28 de febrero al 15 de marzo de 2026',
    lugar: 'Espacio Riesco, Santiago',
    urlUbicacion: 'https://maps.app.goo.gl/rxfEqv7V98QT8HRZA',
    imagen: imgValorant,
  },
  {
    id: 3,
    nombre: 'Comic Con Chile 2026',
    descripcion: 'En su decimoquinta edición, la convención de cultura pop más importante del país reunió en Espacio Riesco a miles de fanáticos del gaming, el anime, el cómic y el cosplay. El evento incluyó concurso de cosplay, activaciones interactivas y la visita de invitados internacionales, entre ellos el actor Carlos Villagrán ("Quico").',
    fechaInicio: '2026-07-03',
    fechaFin: '2026-07-05',
    fechaTexto: '3, 4 y 5 de julio de 2026',
    lugar: 'Espacio Riesco, Huechuraba',
    urlUbicacion: 'https://maps.app.goo.gl/rxfEqv7V98QT8HRZA',
    imagen: imgComicCon,
  },
]

/** @type {Noticia[]} */
const NOTICIAS_INICIALES = [
  {
    id: 1,
    titulo: 'Grand Theft Auto VI',
    descripcion: 'El lanzamiento oficial de Grand Theft Auto VI (GTA 6) está programado para el 19 de noviembre de 2026. El videojuego de Rockstar Games estará disponible inicialmente en exclusiva para las consolas de nueva generación: PlayStation 5 y Xbox Series X|S. Por el momento, no se ha confirmado una fecha oficial para su versión de PC.',
    imagen: imgCards1,
  },
  {
    id: 2,
    titulo: 'Kojima VS PlayStation',
    descripcion: 'PlayStation canceló unilateralmente el desarrollo de Physint, el próximo gran juego de espionaje de Hideo Kojima, debido a presuntos retrasos y sobrecostos. Tras el quiebre, Xbox rescató el proyecto en el Tokyo Game Show 2026 y se convirtió en su nuevo distribuidor oficial. Aunque el director japonés afirmó no guardar rencor a Sony, el futuro del título en consolas PlayStation ahora depende exclusivamente de Microsoft.',
    imagen: imgKojimacard,
  },
  {
    id: 3,
    titulo: '¿La IA puede acabar con la humanidad?',
    descripcion: 'Jacob Coxon es un investigador franco-británico de 27 años especializado en inteligencia artificial. Recientemente se volvió el centro de la atención internacional tras renunciar públicamente a Anthropic y lanzar una severa advertencia global: según sus proyecciones, la IA "podría matarnos a todos" para el año 2030.',
    imagen: imgCoxoncard,
  },
  {
    id: 4,
    titulo: 'Silent Hill: Townfall',
    descripcion: 'Konami y el estudio Screen Burn, junto a Annapurna Interactive, estrenaron el 24 de septiembre de 2026 la nueva entrega de la saga de terror psicológico. La historia deja de lado la clásica niebla de Silent Hill y traslada la acción a St. Amelia, un pueblo costero escocés, donde el protagonista Simon Ordell deberá enfrentar los fragmentos de su pasado mientras evita ser detectado por criaturas que acechan en la oscuridad.',
    imagen: imgTownfallcard,
  },
  {
    id: 5,
    titulo: "Marvel's Wolverine ya está disponible",
    descripcion: "Insomniac Games, el estudio detrás de Marvel's Spider-Man, lanzó el 15 de septiembre de 2026 su exclusivo de PlayStation 5 protagonizado por Logan. La producción apuesta por un tono más oscuro y visceral que sus juegos anteriores, con un combate brutal de garras y una historia original que explora el pasado atormentado del mutante a través de escenarios como Madripoor, Canadá y Japón.",
    imagen: imgWolverinecard,
  },
  {
    id: 6,
    titulo: 'The Witcher 3 recibe un remaster gratuito',
    descripcion: 'CD Projekt Red sorprendió en la Gamescom 2026 al anunciar The Witcher 3: Wild Hunt Remastered, una actualización gratuita para todos los dueños del juego que llegará el 29 de septiembre a PC, PlayStation 5, Xbox Series X|S y, por primera vez, Nintendo Switch 2. El remaster suma mejoras de combate, movimiento y gráficos, además de incluir sin costo adicional las expansiones Hearts of Stone y Blood and Wine.',
    imagen: imgWitcher3card,
  },
  {
    id: 7,
    titulo: 'Blizzard confirma Diablo V',
    descripcion: 'Durante la BlizzCon 2026, Blizzard Entertainment sorprendió a los fanáticos al anunciar oficialmente Diablo V, con una ventana de lanzamiento fijada para la primavera boreal de 2029. La historia arrancará después de la derrota: Santuario ya ha caído y Diablo ha vencido, planteando una premisa inédita para la saga. Por ahora no se confirmaron plataformas ni se mostró gameplay.',
    imagen: imgDiablo5card,
  },
  {
    id: 8,
    titulo: 'Zelda: Ocarina of Time Remake tiene fecha',
    descripcion: 'Nintendo confirmó que el remake de The Legend of Zelda: Ocarina of Time llegará en exclusiva a Nintendo Switch 2 el 5 de noviembre de 2026. El anuncio se dio en el marco del 40° aniversario de la saga e incluyó el primer gameplay oficial, mostrando una renovación visual completa del clásico de Nintendo 64 con controles adaptados a la nueva consola.',
    imagen: imgZeldaoot,
  },
  {
    id: 9,
    titulo: 'Control: Resonant llega el mismo día que Silent Hill',
    descripcion: 'Remedy Entertainment lanzó el 24 de septiembre de 2026 Control: Resonant, la nueva entrega de su saga sobrenatural a una escala mayor que la original. Jesse Faden regresa para enfrentar una nueva grieta en la realidad que distorsiona todo a su paso, combinando tiroteos telequinéticos, arquitectura cambiante y la atmósfera de misterio cósmico característica de la franquicia.',
    imagen: imgControlcard,
  },
]

/**
 * Usuarios de prueba,
 * @type {UsuarioAlmacenado[]}
 */
const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: 'Administrador',
    email: 'admin@levelup.cl',
    password: 'admin1234',
    rol: 'administrador',
  },
  {
    id: 2,
    nombre: 'Cliente de prueba',
    email: 'cliente@levelup.cl',
    password: 'cliente1234',
    rol: 'cliente',
  },
]


//  Productos


const coleccionProductos = crearColeccion('productos', PRODUCTOS_INICIALES, {
  validar: (producto) => {
    exigirTexto(producto.nombre, 'nombre')
    exigirTexto(producto.descripcion, 'descripcion')
    if (!Object.hasOwn(CATEGORIAS, producto.categoria)) {
      throw new Error(`La categoría "${producto.categoria}" no existe.`)
    }
    if (!Number.isInteger(producto.precio) || producto.precio < 0) {
      throw new Error('El precio debe ser un número entero mayor o igual a 0 (en pesos).')
    }
  },
})

export const productos = {
  ...coleccionProductos,

  /** Productos de una categoría: 'consolas', 'accesorios', 'computadores', 'sillas', 'juegosMesa' o 'merch'. */
  porCategoria(/** @type {Categoria} */ categoria) {
    return coleccionProductos.leerTodos((p) => p.categoria === categoria)
  },

  /** Busca por nombre, sin distinguir mayúsculas ni tildes. Un texto vacío devuelve todo. */
  buscar(/** @type {string} */ texto) {
    const consulta = normalizar(texto).trim()
    if (consulta === '') return coleccionProductos.leerTodos()
    return coleccionProductos.leerTodos((p) => normalizar(p.nombre).includes(consulta))
  },

  /** Al eliminar un producto también sale del carro (integridad referencial). */
  eliminar(/** @type {number | string} */ id) {
    const eliminado = coleccionProductos.eliminar(id)
    if (eliminado) carro.quitarProducto(eliminado.id)
    return eliminado
  },
}


//  Eventos


export const eventos = crearColeccion('eventos', EVENTOS_INICIALES, {
  validar: (evento) => {
    exigirTexto(evento.nombre, 'nombre')
    exigirTexto(evento.descripcion, 'descripcion')
    exigirTexto(evento.lugar, 'lugar')
    const inicio = Date.parse(evento.fechaInicio)
    const fin = Date.parse(evento.fechaFin)
    if (Number.isNaN(inicio) || Number.isNaN(fin)) {
      throw new Error('Las fechas deben tener el formato AAAA-MM-DD.')
    }
    if (fin < inicio) {
      throw new Error('La fecha de término no puede ser anterior a la de inicio.')
    }
  },
})

/** Un evento está finalizado cuando su último día ya terminó. */
export const eventoFinalizado = (/** @type {Evento} */ evento, hoy = new Date()) =>
  new Date(`${evento.fechaFin}T23:59:59`) < hoy


//  Noticias


export const noticias = crearColeccion('noticias', NOTICIAS_INICIALES, {
  validar: (noticia) => {
    exigirTexto(noticia.titulo, 'titulo')
    exigirTexto(noticia.descripcion, 'descripcion')
  },
})


//  Usuarios


/** @type {ReturnType<typeof crearColeccion<UsuarioAlmacenado, Usuario>>} */
const coleccionUsuarios = crearColeccion('usuarios', USUARIOS_INICIALES, {
  ocultar: ['password'], // las lecturas nunca devuelven la contraseña
  validar: (usuario, otros) => {
    exigirTexto(usuario.nombre, 'nombre')
    if (!Object.hasOwn(ROLES, usuario.rol)) {
      throw new Error(`El rol "${usuario.rol}" no existe.`)
    }
    if (typeof usuario.email !== 'string' || !REGEX_EMAIL.test(usuario.email)) {
      throw new Error('El correo electrónico no es válido.')
    }
    if (typeof usuario.password !== 'string' || usuario.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.')
    }
    const correo = usuario.email.toLowerCase()
    if (otros.some((otro) => otro.email.toLowerCase() === correo)) {
      throw new Error('Ya existe un usuario registrado con ese correo.')
    }
  },
})

export const usuarios = {
  ...coleccionUsuarios,

  /** Registra un usuario nuevo. Si no se indica el rol, queda como "cliente". */
  crear(/** @type {Omit<UsuarioAlmacenado, 'id' | 'rol'> & { rol?: Rol }} */ datos) {
    return coleccionUsuarios.crear({ rol: 'cliente', ...datos })
  },

  /** Inicio de sesión: devuelve el usuario (sin contraseña) o null si las credenciales no coinciden. */
  autenticar(/** @type {string} */ email, /** @type {string} */ password) {
    const correo = String(email).toLowerCase()
    const [usuario] = coleccionUsuarios.leerTodos(
      (u) => u.email.toLowerCase() === correo && u.password === password,
    )
    return usuario ?? null
  },
}


//  Carro de compras


const coleccionCarro = crearColeccion('carro', /** @type {ItemCarro[]} */ ([]), {
  validar: (item, otros) => {
    exigirCantidad(item.cantidad)
    if (!productos.leerPorId(item.productoId)) {
      throw new Error(`No existe un producto con id ${item.productoId}.`)
    }
    if (otros.some((otro) => otro.productoId === item.productoId)) {
      throw new Error('Ese producto ya está en el carro; actualiza su cantidad.')
    }
  },
})

const detalleCarro = () =>
  coleccionCarro.leerTodos().map((item) => {
    const producto = /** @type {Producto} */ (productos.leerPorId(item.productoId))
    return { ...item, producto, subtotal: producto.precio * item.cantidad }
  })

export const carro = {
  ...coleccionCarro,

  /** "Añadir al carro": agrega el producto o, si ya estaba, suma la cantidad. */
  agregar(/** @type {number | string} */ productoId, cantidad = 1) {
    exigirCantidad(cantidad)
    const id = Number(productoId)
    const [existente] = coleccionCarro.leerTodos((item) => item.productoId === id)
    return existente
      ? coleccionCarro.actualizar(existente.id, { cantidad: existente.cantidad + cantidad })
      : coleccionCarro.crear({ productoId: id, cantidad })
  },

  /** Fija la cantidad de un producto que ya está en el carro (null si no estaba). */
  cambiarCantidad(/** @type {number | string} */ productoId, /** @type {number} */ cantidad) {
    exigirCantidad(cantidad)
    const id = Number(productoId)
    const [existente] = coleccionCarro.leerTodos((item) => item.productoId === id)
    return existente ? coleccionCarro.actualizar(existente.id, { cantidad }) : null
  },

  /** Quita un producto del carro (por id de producto, no de item). */
  quitarProducto(/** @type {number | string} */ productoId) {
    const id = Number(productoId)
    const [existente] = coleccionCarro.leerTodos((item) => item.productoId === id)
    return existente ? coleccionCarro.eliminar(existente.id) : null
  },

  /** Items del carro con su producto y subtotal. */
  detalle: detalleCarro,

  /** Monto total del carro, en pesos. */
  total() {
    return detalleCarro().reduce((suma, item) => suma + item.subtotal, 0)
  },

  /** Cantidad total de unidades en el carro. */
  cantidadTotal() {
    return coleccionCarro.leerTodos().reduce((suma, item) => suma + item.cantidad, 0)
  },

  /** Deja el carro vacío. */
  vaciar() {
    coleccionCarro.reiniciar()
  },
}


//  Pedidos (checkout)


/**
 * Revisa los datos de entrega. Devuelve un objeto con un mensaje por cada campo
 * incorrecto ({} si todo está bien), para mostrarlo junto a cada campo del formulario.
 * @param {Partial<DatosEntrega>} entrega
 * @returns {Partial<Record<keyof DatosEntrega, string>>}
 */
export const validarEntrega = (entrega) => {
  /** @type {Partial<Record<keyof DatosEntrega, string>>} */
  const errores = {}
  const vacio = (/** @type {unknown} */ valor) => typeof valor !== 'string' || valor.trim() === ''
  const telefono = String(entrega.telefono ?? '').replace(/[\s().-]/g, '')

  if (vacio(entrega.nombre)) errores.nombre = 'Ingresa el nombre de quien recibe.'
  if (!REGEX_EMAIL.test(String(entrega.email ?? '').trim())) {
    errores.email = 'Ingresa un correo electrónico válido.'
  }
  if (!/^\+?\d{8,12}$/.test(telefono)) {
    errores.telefono = 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.'
  }
  if (!REGIONES.includes(/** @type {string} */ (entrega.region))) errores.region = 'Selecciona la región.'
  if (vacio(entrega.comuna)) errores.comuna = 'Ingresa la comuna.'
  if (vacio(entrega.calle)) errores.calle = 'Ingresa la calle.'
  if (vacio(entrega.numero)) errores.numero = 'Ingresa el número.'
  return errores
}

const coleccionPedidos = crearColeccion('pedidos', /** @type {Pedido[]} */ ([]), {
  validar: (pedido) => {
    if (!usuarios.leerPorId(pedido.usuarioId)) {
      throw new Error(`No existe un usuario con id ${pedido.usuarioId}.`)
    }
    if (!Array.isArray(pedido.items) || pedido.items.length === 0) {
      throw new Error('El pedido debe tener al menos un producto.')
    }
    if (!Number.isInteger(pedido.total) || pedido.total < 0) {
      throw new Error('El total del pedido no es válido.')
    }
    const [primerError] = Object.values(validarEntrega(pedido.entrega ?? {}))
    if (primerError) throw new Error(primerError)
  },
})

export const pedidos = {
  ...coleccionPedidos,

  /** Pedidos de un usuario. */
  porUsuario(/** @type {number | string} */ usuarioId) {
    const id = Number(usuarioId)
    return coleccionPedidos.leerTodos((pedido) => pedido.usuarioId === id)
  },

  /**
   * Convierte el carro en un pedido con sus datos de entrega y deja el carro vacío.
   * El pedido guarda nombre y precio de cada producto tal como estaban al comprar.
   */
  crearDesdeCarro(/** @type {number | string} */ usuarioId, /** @type {DatosEntrega} */ entrega) {
    const items = carro.detalle().map(({ producto, cantidad, subtotal }) => ({
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal,
    }))
    if (items.length === 0) throw new Error('El carro está vacío.')

    const pedido = coleccionPedidos.crear({
      usuarioId: Number(usuarioId),
      fecha: new Date().toISOString(),
      estado: 'recibido',
      items,
      total: carro.total(),
      entrega,
    })
    carro.vaciar()
    return pedido
  },
}


//  Reinicio general


/** Devuelve todas las colecciones a sus datos iniciales (útil para pruebas). */
export const reiniciarBaseDeDatos = () => {
  productos.reiniciar()
  eventos.reiniciar()
  noticias.reiniciar()
  usuarios.reiniciar()
  carro.reiniciar()
  pedidos.reiniciar()
}
