
import './App.css';
import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'
import NewUser from './components/NewUser/NewUser'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Schedule />
      <NewGame />
      <NewUser />

    </div>
  );
}

export default App;
