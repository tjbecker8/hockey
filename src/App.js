
import './App.css';
import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'
import NewUser from './components/NewUser/NewUser'
import Login from './components/login/Login'
import ViewGame from './components/viewGame/ViewGame'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Schedule />
      <NewGame />
      <NewUser />
      <Login />
      <ViewGame />

    </div>
  );
}

export default App;
