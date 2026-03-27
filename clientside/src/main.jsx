import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Config/AuthProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { THEUser } from './Utility/THEUser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId='593413349436-npfakees2o5opg8g9dqpoa8m72jssnmo.apps.googleusercontent.com'>
        <THEUser>

          <App />
        </THEUser>
      </GoogleOAuthProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
