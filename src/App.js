import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './components/Profile';
import Newsfeed from './components/Newsfeed';
import Mytweets from './components/Mytweets';
import Followings from './components/Followings';
import Followers from './components/Followers';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  return (
   <>
 
   <Router>
   <Navbar />
    <Routes>
    <Route exact path="/" element={<Newsfeed />}/>
    <Route exact path="/profile" element={<Profile />}/>
    <Route exact path="/followers" element={<Followers />}/>
    <Route exact path="/following" element={<Followings />}/>
    <Route exact path="/tweets" element={<Mytweets />}/>
    <Route exact path="/signup" element={<Signup />}/>
    <Route exact path="/login" element={<Login />}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
