import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import routes from 'config/routes';
import Header from 'components/ui/Header';
import Main from 'components/ui/Main';

function App() {
  return (
    <Routes>
      <Header />
      <Main>
        <Switch>
          <Redirect exact from="/" to="/class/paladin" />
          {routes.map(({ name, path, exact, Component }: RouteProps) =>
            <Route
              key={name}
              path={path}
              exact={exact}
              component={Component}
            />
          )}
        </Switch>
      </Main>
    </Routes>
  );
}

export default App;
