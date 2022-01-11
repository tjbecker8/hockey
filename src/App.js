
import './App.css';
import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Schedule />
      <NewGame />

    </div>
  );
}

export default App;
