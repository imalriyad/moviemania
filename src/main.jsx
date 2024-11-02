import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './layout/MainLayout'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <NextUIProvider>
    <MainLayout></MainLayout>
    </NextUIProvider>
    </RouterProvider>
  </StrictMode>,
)
