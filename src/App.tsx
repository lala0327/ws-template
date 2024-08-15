import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes'
import WebsocketControl from './compoment/WebsocketControl'

function App() {

  return (
    <>
      <BrowserRouter>
        <WebsocketControl/>
        <AllRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
