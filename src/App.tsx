
import { Provider } from 'react-redux'
import './App.css'
import Store from './Components/Store/Store'
import { RouterProvider } from 'react-router'
import { router } from './router'
import theme from './theme'
import { ThemeProvider } from '@mui/material'

function App() {

  return (
    <>
          <ThemeProvider theme={theme}>

      <Provider store={Store}>
        <RouterProvider router={router}/>
      </Provider>
      </ThemeProvider>

    </>
  )
}

export default App
