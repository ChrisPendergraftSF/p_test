import {Provider} from "react-redux";

import './App.css';
import ChartHolder from "./components/ChartHolder/Chartholder";
import ChartFilters from "./components/ChartFilters/Chartfilters"
import store from "../src/redux/reduxconfig"
function App() {






  return (

        <div className="App">
            <Provider store={store} >
                <ChartFilters ></ChartFilters>
                <ChartHolder ></ChartHolder>
            </Provider>
        </div>

  );
}

export default App;
