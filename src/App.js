import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Dashboard from './components/Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  
  return (
    <>
    <Router>
       <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
       <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
       </AuthProvider>
    </Router>
    </>
  );
}

export default App;
