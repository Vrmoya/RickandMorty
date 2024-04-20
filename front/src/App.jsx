import { useState, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import About from "./components/about/About.jsx";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/detail/Detail.jsx";
import Error from "./components/error/Error.jsx";
import Form from "./components/form/Form.jsx";
import Nav from "./components/nav/Nav";
import Favorites from "./components/Favorites/Favorites.jsx";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [access, setAccess] = useState(false);
  const [characters, setCharacters] = useState([]);
 
  const URL = "http://localhost:3001/rickandmorty/";

  async function login({ email, password }) {
    try {
      const { data } = await axios(`${URL}login?email=${email}&password=${password}`);
      const { access } = data;

      setAccess(access);
      access && navigate("/home");
      
    } catch ({ response }) {
      const { data } = response;

      alert(data.message);
    }
  }


  function logout() {
    setAccess(false);
    navigate("/");
  }

  useMemo(() => {
    if (!access) {
      navigate("/");
    }
  }, [access]);

  const onSearch = async (id) => {
    const exists = characters.find((char) => char.id === Number(id));

    if (exists) {
      window.alert("El personaje ya existe");
      return;
    }

    try {
      if (id === 'random') {

        const randomId = Math.floor(Math.random() * 826 + 1);
  
        const result = await axios(`${URL}character/${randomId}`);
        const {data} = result;
  
        if (data.name) {
            setCharacters(prev => [...prev, data]);
        }
  
      } else {
  
        const result = await axios(`${URL}character/${id}`);
        const {data} = result;
  
        if (data.name) {
            setCharacters(prev => [...prev, data]);
        } else if (id > 826) {
            window.alert('Personaje no encontrado');
        }
  
      }
    } catch (error) {
      alert(error.response.data)
    }
  };

 
  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== Number(id)));
  };

  return (
    <div className="App">
      {pathname !== "/" && <Nav onSearch={onSearch} logout={logout} />}

      <Routes>
        <Route path="/" element={<Form login={login} />}></Route>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
