import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import store from "./store";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
