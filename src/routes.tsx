import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/home';
import MainLayout from './layout/main-layout';
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<MainLayout><Home/></MainLayout>}/>

    </Routes>
 
    </BrowserRouter>
  )
}

export default AppRoutes
