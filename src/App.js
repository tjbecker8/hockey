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
import AdminRoute from './AdminRoute'
import ManagerRoute from './ManagerRoute'
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
import AdminPage from './components/adminPage/AdminPage'





function App() {
  const { currentUser, loading } = useContext(AuthContext);


  return (


    <div className="App">

      {(loading ?

        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
          :
        <div>
        <TopBar />
        <Routes>
          <Route path="/" element={ <HomePage/> } />
          <Route path="schedule" element={
              <PrivateRoute>
                <Schedule />
              </PrivateRoute>
            } />
          <Route path="newgame" element={
            <ManagerRoute>
              <NewGame />
            </ManagerRoute>
           } />
          <Route path="newuser" element={ <NewUser /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="viewgame" element={
            <PrivateRoute>
              <ViewGame />
            </PrivateRoute> } >
            <Route path=":id" element={
              <PrivateRoute>
                <ViewGame />
              </PrivateRoute>
            } />
          </Route >
          <Route path="editgame" element={
              <ManagerRoute>
                <EditGame />
              </ManagerRoute>
            } >
            <Route path=":id" element={
              <ManagerRoute>
                <EditGame />
              </ManagerRoute>
            } />
          </Route >
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
           } />
          <Route path="updateprofile" element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
           } />
          <Route path="assigngames" element={
            <AdminRoute >
              <AssignGames />
            </AdminRoute>
          } />
          <Route path='mygames' element={
            <PrivateRoute >
              <MyGames />
            </PrivateRoute>
          }/>
        <Route path='admin' element={
            <AdminRoute >
              <AdminPage />
            </AdminRoute>
          }/>

        </Routes>
        </div>
)}





    </div>
  );
}

export default App;

//for tomorrow to work on:
//page for editing games/assiging officials should be 2 seperate pages
//start adding firebase
//eventually build a reporting system of games, games officiated, payments, and submitting game reports.
