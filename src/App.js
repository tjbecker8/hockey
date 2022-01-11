
import './App.css';
import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'
import NewUser from './components/NewUser/NewUser'
import Login from './components/login/Login'
import ViewGame from './components/viewGame/ViewGame'
import EditGame from './components/viewGame/EditGame'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Schedule />
      <NewGame />
      <NewUser />
      <Login />
      <ViewGame />
      <EditGame />

    </div>
  );
}

export default App;

//for tomorrow to work on:
//page for editing games/assiging officials should be 2 seperate pages
//start adding firebase
//eventually build a reporting system of games, games officiated, payments, and submitting game reports.
