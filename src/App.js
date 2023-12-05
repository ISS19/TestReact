import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import ListePersonneComponent from './components/ListePersonneComponent';
import HeaderComponents from './components/HeaderComponents';
import ModifPersonneComponents from './components/ModifPersonneComponents'; 
import AjouterPersonneComponents from './components/AjouterPersonneComponents';
import { AnimatePresence } from 'framer-motion';

function Rendu(){
  const location = useLocation();
  return(
    <div> 
      <HeaderComponents />
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path ='/Personne' Component={ListePersonneComponent}></Route>
          <Route path='/' Component={ListePersonneComponent}></Route>
          <Route path='/Ajout_Personne' Component={AjouterPersonneComponents}></Route>
          <Route path="/Modification_Personne/:id" Component={ModifPersonneComponents} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <div>
      <Router>
        <Rendu />
      </Router>
        
    </div>
  );
}

export default App;
