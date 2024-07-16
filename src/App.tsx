import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { ItemsContextProvider } from './contexts/ItemsContext'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <ItemsContextProvider>
          <UserContextProvider>
            <Router />
          </UserContextProvider>
        </ItemsContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
