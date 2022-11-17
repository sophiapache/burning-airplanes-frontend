import FlightPage from "./Flightpage/FlightPage";
import SearchPage from "./Homepage/SearchPage";
import Navbar from "./Homepage/Navbar";
import Login from "./Login/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/"><SearchPage /></Route>
      </Switch>
      <Switch>
        <Route path="/flights/:id" component={FlightPage} />
      </Switch>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
