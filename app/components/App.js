const React = require('react');
const Header = require('./Header');
const Search = require('./Search');
const Forecast = require('./Forecast');
const Detail = require('./Detail');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <Switch>
            <Route path='/' exact component={Search} />
            <Route path='/forecast' exact component={Forecast} />
            <Route path='/detail/:location' component={Detail} />
            <Route render={function() {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
