import FlightPage from "./Flightpage/FlightPage";
import SearchPage from "./Homepage/SearchPage";
import Login from "./Login/Login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><SearchPage /></Route>
      </Switch>
      <Switch>
        <Route path="/flights/:id" component={FlightPage} />
      </Switch>
    </Router>
  );
}

export default App;
