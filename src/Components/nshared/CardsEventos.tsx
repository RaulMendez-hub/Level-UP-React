import evento1 from '../../image/expogame.jpeg'
import evento2 from '../../image/valorant.jpeg'
import evento3 from '../../image/Comic-Con.jpg'


export const CardsEventos = () => {
  return (
    <div>
      <div className="titulo1">
        <h1>EVENTOS GAMING EN CHILE</h1>
      </div>
      <div className="consolas">
        <div className="card">
          <img
            alt="Expogame 2026"
            className="card-img-top"
            src={evento1}
          />
          <div className="card-body">
            <h5 className="card-title">Expogame 2026</h5>
            <p className="card-text">
              La feria de videojuegos, streaming y cultura pop más grande de Chile
              vuelve a Santiago en su decimonovena edición, bajo el concepto "Más
              allá del juego". Contará con zonas gamificadas donde los asistentes
              podrán acumular Cristales Expogame y canjear premios a través del
              Pasaporte Expogame, además del torneo competitivo Expogame Champions.
              Como invitados estelares se presentarán el streamer mexicano El
              Mariana y el artista español Keyblade, con shows en vivo cargados de
              música y referencias gamer.
            </p>
            <p>
              📅 2, 3 y 4 de octubre de 2026 — Centro Cultural Estación Mapocho,
              Santiago
            </p>
            <a
              className="btn btn-primary"
              href="https://maps.app.goo.gl/93XRZJe1QZynQJ8P9">
              Ver ubicacion
            </a>
          </div>
        </div>
        <div className="card">
          <img
            alt="VALORANT Masters Santiago 2026"
            className="card-img-top"
            src={evento2}
          />
          <div className="card-body">
            <h5 className="card-title">VALORANT Masters Santiago 2026</h5>
            <p className="card-text">
              El primer Masters internacional de la Valorant Champions Tour
              disputado en Sudamérica se realizó en el Espacio Riesco, reuniendo a
              doce equipos provenientes de las principales ligas del circuito
              (Americas, EMEA, Pacific y China) con una bolsa de premios de un
              millón de dólares. El equipo RedForce se coronó campeón tras vencer a
              Paper Rex en la gran final, consolidando a Santiago como un nuevo
              epicentro de los esports a nivel mundial.
            </p>
            <p>
              📅 28 de febrero al 15 de marzo de 2026 — Espacio Riesco, Santiago
              (evento finalizado)
            </p>
            <a
              className="btn btn-primary"
              href="https://maps.app.goo.gl/rxfEqv7V98QT8HRZA">
              Ver ubicacion
            </a>
          </div>
        </div>
        <div className="card">
          <img
            alt="Comic Con Chile 2026"
            className="card-img-top"
            src= {evento3}
          />
          <div className="card-body">
            <h5 className="card-title">Comic Con Chile 2026</h5>
            <p className="card-text">
              En su decimoquinta edición, la convención de cultura pop más
              importante del país reunió en Espacio Riesco a miles de fanáticos del
              gaming, el anime, el cómic y el cosplay. El evento incluyó concurso de
              cosplay, activaciones interactivas y la visita de invitados
              internacionales, entre ellos el actor Carlos Villagrán ("Quico").
            </p>
            <p>
              📅 3, 4 y 5 de julio de 2026 — Espacio Riesco, Huechuraba (evento
              finalizado)
            </p>
            <a
              className="btn btn-primary"
              href="https://maps.app.goo.gl/rxfEqv7V98QT8HRZA">
              Ver ubicacion
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
