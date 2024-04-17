import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.scss'
import appRoutes from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/authProvider.jsx'
import BlogProvider from './providers/blogProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={appRoutes}/>
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>,
)
