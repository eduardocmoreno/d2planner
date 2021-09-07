import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import Header from './components/Header';
import './assets/scss/main.scss';

function App() {
  return (
    <Routes>
      <Header />
      <main className="container">
        <Switch>
          {<Redirect exact from="/" to="/class/paladin" />}
          {routes.map(route =>
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.Component}
            />
          )}
        </Switch>
      </main>
    </Routes>
  );
}

export default App;
