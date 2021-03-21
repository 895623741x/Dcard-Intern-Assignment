import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CityPage from "./Pages/CityPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/scenicSpot" component={Homepage} />
				<Route path="/scenicSpot/:cityName" component={CityPage} />
			</Switch>
		</Router>
	);
}

export default App;
