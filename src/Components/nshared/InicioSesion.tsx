

export const InicioSesion = () => {
  return (
    <div>
        <h1>Iniciar sesión</h1>
        <p className="sub">Ingresa tus credenciales para continuar</p>
        <p className="nota">
            <span className="req">*</span> Campo obligatorio
        </p>
        <form id="loginForm" noValidate>
            <div className="field">
            <label htmlFor="email">
                Correo electrónico <span className="req">*</span>
            </label>
            <input
                aria-required="true"
                autoComplete="username"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                required
                type="email"
            />
            <small className="error" id="emailError" />
            </div>
            <div className="field">
            <label htmlFor="password">
                Contraseña <span className="req">*</span>
            </label>
            <input
                aria-required="true"
                autoComplete="current-password"
                id="password"
                name="password"
                required
                type="password"
            />
            <small className="error" id="passwordError" />
            </div>
            <div className="options">
            <label>
                <input id="remember" type="checkbox" /> Recordarme
            </label>
            </div>
            <button type="submit">Entrar</button>
        </form>
    </div>
  )
}
