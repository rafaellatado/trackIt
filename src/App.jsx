import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from "./GlobalStyles"
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Hoje from './pages/Hoje';
import Habitos from './pages/Habitos';
import UserInfoContext from './contexts/UserInfoContext';
import NewHabitContext from './contexts/NewHabitContext';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [image, setImage] = useState(localStorage.getItem('image'));

  const [newHabit, setNewHabit] = useState({
    name: '',
    days: []
  })

  return (
    <UserInfoContext.Provider value={{ token, setToken, image, setImage }}>
      <NewHabitContext.Provider value={{ newHabit, setNewHabit }}>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path='/' element={<Login token={token} setToken={setToken} setImage={setImage} />}></Route>
            <Route path='/cadastro' element={<Cadastro />}></Route>
            <Route path='/habitos' element={<Habitos token={token} />} />
            <Route path='/hoje' element={<Hoje token={token} />}></Route>
          </Routes>
        </BrowserRouter>
      </NewHabitContext.Provider>
    </UserInfoContext.Provider>
  )
}

export default App

/*  
Tela Hábitos:
- Caso tenha dados já preenchidos, os mesmos devem ser mantidos 
  caso o usuário reabra o formulário de criação.
*/
