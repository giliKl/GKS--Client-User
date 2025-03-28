
import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import theme from './theme'
import { ThemeProvider } from '@mui/material'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
