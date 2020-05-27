import React from 'react';
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {ConnectedRouter} from "connected-react-router";
import {history} from "./services/navigation-service";
import 'antd/dist/antd.css'
import {LoginPage} from "./page/login/login";
import {Route, Switch} from "react-router";
import {PrivateRouting} from "./api/common/PrivateRouting";
import {AppLayout} from "./layout/app-layout";

function App() {
  return (
      <div className="App">
          <Provider store={store}>
              <PersistGate
                  persistor={persistStore(store)}
              >
                  <ConnectedRouter history={history}>
                      <Switch>
                          <PrivateRouting path="/app" component={AppLayout}/>
                          <Route path="/" component={LoginPage}/>
                      </Switch>
                  </ConnectedRouter>
              </PersistGate>
          </Provider>
      </div>
  );
}

export default App;
