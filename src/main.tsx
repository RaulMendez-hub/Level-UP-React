
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App } from "./App";
import "./css/header.css"
import "./css/main.css"
import "./css/styles.css"
import { BrowserRouter} from 'react-router-dom';






createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </StrictMode>,
)
