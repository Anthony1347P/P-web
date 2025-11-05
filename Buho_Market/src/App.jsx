import './App.css'
import {AuthContextProvider} from "./context/AuthContext"
import MyRoutes from './routers/routes.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <MyRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
