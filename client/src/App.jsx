import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import CollectionPage from "./scenes/collectionPage";
import GamePage from "./scenes/gamePage";
import PokecodexPage from "./scenes/pokecodexPage";
import StartPage from "./scenes/startPage";
import NavigationBar from "./scenes/navigationBar/NavigationBar";
import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState(null);
  const [isJustLoggedOut, setJustLoggedOut] = useState(false)

  useEffect(() => {
    if(window.localStorage.getItem('playerLog')){
     const localStorageData = JSON.parse(window.localStorage.getItem('playerLog'))
     setPlayer(localStorageData); 
    }
    window.addEventListener("storage", () => {
      const localStorageData = JSON.parse(
        window.localStorage.getItem("playerLog"),
      );

      setPlayer(localStorageData);
    });
    return () => {
      window.removeEventListener("storage", () => {
        console.log("eventlistner moved");
      });
    };
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <NavigationBar currentPlayer={player} setCurrentPlayer={setPlayer} onLogOut={setJustLoggedOut}/>
        <Routes>
          <Route path='/' element={<HomePage player={player} />} />
          <Route path='/collection' element={<CollectionPage player={player} />} />
          <Route path='/play' element={<GamePage player={player} />} />
          <Route path='/pokecodex' element={<PokecodexPage />} />
          <Route path='/start' element={<StartPage player={player} isJustLoggedOut={isJustLoggedOut}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
