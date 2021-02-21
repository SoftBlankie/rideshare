import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { isMobile } from 'react-device-detect';
import MobileLayout from './components/MobileLayout';
import Login from "./components/MobileLogin";
import Signup from "./components/MobileSignup";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={isMobile && MobileLayout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
