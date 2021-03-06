import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
// import Join from "./components/Join";
// import Chat from "./components/Chat";
import routes from "./config/routes";

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div>
        <Router>
            <Switch>
                {routes.map((route, index) => {
                    return (
                        <Route 
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props: RouteComponentProps<any>) => (
                                <route.component
                                    name={route.name} 
                                    {...props}
                                    {...route.props}
                                />
                            )}
                        />
                    );
                })}
            </Switch>
        </Router>
    </div>
);
};

export default App;
