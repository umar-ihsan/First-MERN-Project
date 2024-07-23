import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUpForm from './pages/SignUp';
import LoginForm from './pages/Login';
import { useAuthContext } from './hooks/authContextHook';

function App() {

  const {user} =useAuthContext()

  return (

    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <div className='pages'>

      <Routes>

       <Route path='/' element={user ? <Home/> : <LoginForm/>}/>

       <Route path='/signup' element={!user ? <SignUpForm/> : <Home/>}/>

       <Route path='/login' element={!user ? <LoginForm/> : <Home/>}/>





      </Routes>

     </div>
     </BrowserRouter>

    </div>
   
  );
}

export default App;
