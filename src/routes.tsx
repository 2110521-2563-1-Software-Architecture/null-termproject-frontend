import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Example from "./pages/example/Example";
import Example2 from "./pages/example2/Example2";

export default function Routes() {
  // add more routes here
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/example2" component={Example2} />
        <Route path="/" exact component={Example} />
        <Route path="/">404 not found</Route>
      </Switch>
    </BrowserRouter>
  );
}
