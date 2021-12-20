import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/dashboard' component={Dashboard} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
