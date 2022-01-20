import { useContext } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./privateRoute"
import { AuthContext } from "./auth";
import Spinner from 'react-bootstrap/Spinner'



import Schedule from './components/schedule/schedule'
import TopBar from './components/topBar/TopBar'
import NewGame from './components/newGame/NewGame'
import NewUser from './components/NewUser/NewUser'
import Login from './components/login/Login'
import ViewGame from './components/viewGame/ViewGame'
import EditGame from './components/viewGame/EditGame'
import HomePage from './components/homePage/HomePage'
import Profile from './components/profile/Profile'
import UpdateProfile from './components/profile/UpdateProfile'
import AssignGames from './components/assignGames/AssignGames'
import MyGames from './components/myGames/MyGames'





function App() {
  const { currentUser, loading } = useContext(AuthContext);


  return (


    <div className="App">
      <TopBar />
      {(loading ?
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
          :

        <Routes>
          <Route path="/" element={ <HomePage/> } />
          <Route path="schedule" element={ <Schedule /> } />
          <Route path="newgame" element={ <NewGame /> } />
          <Route path="newuser" element={ <NewUser /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="viewgame" element={ <ViewGame /> } >
            <Route path=":id" element={<ViewGame />} />
          </Route >
          <Route path="editgame" element={ <EditGame />  } >
            <Route path=":id" element={<EditGame />} />
          </Route >
          <Route path="profile" element={ <Profile /> } />
          <Route path="updateprofile" element={ <UpdateProfile /> } />
          <Route path="assigngames" element={ <AssignGames /> } />
          <Route path='mygames' element={
            <PrivateRoute >
              <MyGames />
            </PrivateRoute>
          }/>

        </Routes>

)}





    </div>
  );
}

export default App;

//for tomorrow to work on:
//page for editing games/assiging officials should be 2 seperate pages
//start adding firebase
//eventually build a reporting system of games, games officiated, payments, and submitting game reports.
