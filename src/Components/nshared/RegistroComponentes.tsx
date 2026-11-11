
export const RegistroComponentes = () => {
  return (
    <div>
        <h1>
            CREAR CUENTA
        </h1>
        <p className="sub">
            {" "}
            Únete a la comunidad Level-Up Gamer y comienza a ganar puntos LevelUp{" "}
        </p>
        <form id="registroForm" noValidate>
            <div className="mb-3">
            <label className="form-label" htmlFor="run">
                {" "}
                RUN <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="run"
                placeholder="Ej: 19011022K"
                required
                type="text"
            />
            <div className="form-hint">
                {" "}
                Sin puntos ni guion. Entre 7 y 9 caracteres{" "}
            </div>
            <div className="invalid-feedback" id="runError" />
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="fechaNacimiento">
                {" "}
                Fecha de Nacimiento <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="fechaNacimiento"
                required
                type="date"
            />
            <div className="form-hint">
                {" "}
                Debes ser mayor de 18 años para registrarte{" "}
            </div>
            <div className="invalid-feedback" id="fechaError" />
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="nombre">
                {" "}
                Nombre <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="nombre"
                placeholder="Ingresa tu nombre"
                required
                type="text"
            />
            <div className="invalid-feedback"> Ingresa tu nombre </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="apellidos">
                {" "}
                Apellidos <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="apellidos"
                placeholder="Ingresa tus apellidos"
                required
                type="text"
            />
            <div className="invalid-feedback"> Ingresa tus apellidos </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="email">
                {" "}
                Correo electrónico <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="email"
                placeholder="nombre@duoc.cl"
                required
                type="email"
            />
            <div className="form-hint">
                {" "}
                Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com{" "}
            </div>
            <div className="invalid-feedback"> Ingresa un correo válido </div>
            <div className="discount" id="avisoDescuento">
                {" "}
                ¡Con tu correo Duoc obtienes 20% de descuento de por vida!{" "}
            </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="password">
                {" "}
                Contraseña <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="password"
                placeholder="••••••••"
                required
                type="password"
            />
            <div className="form-hint"> Entre 4 y 10 caracteres </div>
            <div className="invalid-feedback">
                {" "}
                La contraseña debe tener entre 4 y 10 caracteres{" "}
            </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="confirmPassword">
                {" "}
                Confirmar Contraseña <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="confirmPassword"
                placeholder="Repite tu contraseña"
                required
                type="password"
            />
            <div className="invalid-feedback" id="passwordFeedback">
                {" "}
                Las contraseñas deben coincidir{" "}
            </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="region">
                {" "}
                Región <span className="required">*</span>{" "}
            </label>
            <select className="form-select" id="region" required>
                <option value=""> Selecciona una región </option>
            </select>
            <div className="invalid-feedback"> Selecciona una región </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="comuna">
                Comuna <span className="required">*</span>
            </label>
            <select className="form-select" disabled id="comuna" required>
                <option value="">Selecciona primero una región</option>
            </select>
            <div className="invalid-feedback"> Selecciona una comuna </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="direccion">
                {" "}
                Dirección <span className="required">*</span>{" "}
            </label>
            <input
                className="form-control"
                id="direccion"
                placeholder="Calle, número, depto/casa"
                required
                type="text"
            />
            <div className="invalid-feedback"> Ingresa tu dirección </div>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="codigoReferido">
                {" "}
                Código de referido <span className="text-secondary">
                (opcional)
                </span>{" "}
            </label>
            <input
                className="form-control"
                id="codigoReferido"
                placeholder="Ej: GAMER2024"
                type="text"
            />
            <div className="form-hint">
                {" "}
                Si un amigo te invitó, ingresa su código y ambos ganan puntos LevelUp{" "}
            </div>
            </div>
            <div className="form-check mb-4">
            <input
                className="form-check-input"
                id="terminos"
                required
                type="checkbox"
            />
            <label className="form-check-label" htmlFor="terminos">
                {" "}
                Acepto los términos y condiciones{" "}
            </label>
            <div className="invalid-feedback">
                {" "}
                Debes aceptar los términos y condiciones{" "}
            </div>
            </div>
            <button className="btn btn-primary w-100 btn-registro" type="submit">
            {" "}
            REGISTRAR CUENTA{" "}
            </button>
            <div className="alert mt-3 d-none" id="mensajeRegistro" role="alert" />
            <p className="login-link">
            ¿Ya tienes una cuenta?
            <a href="/iniciarSesion.html"> Inicia sesión </a>
            </p>
        </form>
        </div>
  )
}
