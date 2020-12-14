import React, { useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import WeatherPage from "../features/weather";
import HistoryPage from "../features/weather/History";
import { LangContext, LangProvider } from "./LangContext";
import ROUTES from "../common/routes";

const Router: React.FC<any> = () => {
  const lang = useContext(LangContext);

  return (
    <LangProvider value={lang}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={WeatherPage} exact />
          <Route path={ROUTES.history.path} component={HistoryPage} />
        </Switch>
      </BrowserRouter>
    </LangProvider>
  );
};

export default Router;
