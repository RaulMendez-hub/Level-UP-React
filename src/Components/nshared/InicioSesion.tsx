import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { usuarios } from "../../js/BaseDeDatos"
import { guardarSesion } from "../../js/sesion.ts"

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const InicioSesion = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [recordar, setRecordar] = useState(false)
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState("")
  const [ingreso, setIngreso] = useState(false)

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const correo = email.trim()

    // 1) Validar que los campos estén bien escritos
    const mensajeEmail =
      correo === ""
        ? "Ingresa tu correo electrónico."
        : !REGEX_EMAIL.test(correo)
          ? "El correo electrónico no es válido."
          : ""
    const mensajePassword = password === "" ? "Ingresa tu contraseña." : ""
    setErrorEmail(mensajeEmail)
    setErrorPassword(mensajePassword)
    setErrorLogin("")
    if (mensajeEmail || mensajePassword) return

    // 2) Validar las credenciales contra la base de datos
    const usuario = usuarios.autenticar(correo, password)
    if (!usuario) {
      setErrorLogin("Correo o contraseña incorrectos.")
      return
    }

    // 3) Guardar la sesión y entrar
    guardarSesion(usuario, recordar)
    setIngreso(true)
  }

  // if (ingreso) {
  //   return <Navigate to="/" replace />
  // }
  if (ingreso) {
    if (email == 'admin@levelup.cl') { // O la condición que use tu aplicación (ej: usuario.rol === 'admin')
      return <Navigate to={"/Admin"} replace />;
    }
    return <Navigate to="/" replace />;
}

  return (
    <div>
        <h1>Iniciar sesión</h1>
        <p className="sub">Ingresa tus credenciales para continuar</p>
        <p className="nota">
            <span className="req">*</span> Campo obligatorio
        </p>
        <form id="loginForm" noValidate onSubmit={manejarEnvio}>
            <div className="field">
            <label htmlFor="email">
                Correo electrónico <span className="req">*</span>
            </label>
            <input
                aria-required="true"
                autoComplete="username"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
                type="email"
                value={email}
            />
            <small className="error" id="emailError">{errorEmail}</small>
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
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                value={password}
            />
            <small className="error" id="passwordError">{errorPassword}</small>
            </div>
            <div className="options">
            <label>
                <input
                    checked={recordar}
                    id="remember"
                    onChange={(e) => setRecordar(e.target.checked)}
                    type="checkbox"
                /> Recordarme
            </label>
            </div>
            {errorLogin && (
              <small className="error" id="loginError" role="alert">{errorLogin}</small>
            )}
            <button type="submit">Entrar</button>
        </form>
    </div>
  )
}

// export const InicioSesion = () => {
//   return (
//     <div>
//         <h1>Iniciar sesión</h1>
//         <p className="sub">Ingresa tus credenciales para continuar</p>
//         <p className="nota">
//             <span className="req">*</span> Campo obligatorio
//         </p>
//         <form id="loginForm" noValidate>
//             <div className="field">
//             <label htmlFor="email">
//                 Correo electrónico <span className="req">*</span>
//             </label>
//             <input
//                 aria-required="true"
//                 autoComplete="username"
//                 id="email"
//                 name="email"
//                 placeholder="ejemplo@correo.com"
//                 required
//                 type="email"
//             />
//             <small className="error" id="emailError" />
//             </div>
//             <div className="field">
//             <label htmlFor="password">
//                 Contraseña <span className="req">*</span>
//             </label>
//             <input
//                 aria-required="true"
//                 autoComplete="current-password"
//                 id="password"
//                 name="password"
//                 required
//                 type="password"
//             />
//             <small className="error" id="passwordError" />
//             </div>
//             <div className="options">
//             <label>
//                 <input id="remember" type="checkbox" /> Recordarme
//             </label>
//             </div>
//             <button type="submit">Entrar</button>
//         </form>
//     </div>
//   )
// }
