
export const MapaTecnico = () => {
  return (
    <div className="contenedor-contacto">
        <iframe
            className="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.251758000931!2d-70.70837932340487!3d-33.59877170512505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d94f6eef1f51%3A0x48e82f1d2eb65ea9!2sDuoc%20UC%20-%20Sede%20San%20Bernardo!5e0!3m2!1ses!2scl!4v1790378656778!5m2!1ses!2scl"
        />
        <div className="info-tecnico">
            <p className="contacto-tecnico titulo">Servicio Técnico</p>
            <p className="contacto-tecnico">Atención: Lunes a Viernes</p>
            <p className="contacto-tecnico">9:00 a 18:00</p>
            <p className="contacto-tecnico">Número de contacto:</p>
            <a className="wsp-tecnico" href="https://wa.me/">+569 66990493</a>
            <p className="contacto-tecnico">Correo: Leveluptienda@gmail.com</p>
        </div>
        </div>
  )
}
