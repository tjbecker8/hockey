
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";


import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'
import NewUser from './components/NewUser/NewUser'
import Login from './components/login/Login'
import ViewGame from './components/viewGame/ViewGame'
import EditGame from './components/viewGame/EditGame'
import HomePage from './components/homePage/HomePage'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="schedule" element={ <Schedule /> } />

        <Route path="newgame" element={ <NewGame /> } />
        <Route path="newuser" element={ <NewUser /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="viewgame:id" element={ <ViewGame /> } />
        <Route path="editgame" element={ <EditGame />  } />
      </Routes>






    </div>
  );
}

export default App;

//for tomorrow to work on:
//page for editing games/assiging officials should be 2 seperate pages
//start adding firebase
//eventually build a reporting system of games, games officiated, payments, and submitting game reports.
