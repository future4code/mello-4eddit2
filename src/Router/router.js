import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

// pages
import LoginPage from "../Components/LoginPage";
import SignUpPage from "../Components/SignUpPage";
import FeedPage from "../Components/FeedPage";
import PostPage from "../Components/PostPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <FeedPage />
        </Route>
        <Route exact path="/post/:id">
          <PostPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route path="*">
          <h1>Ocorreu um problema... (404)</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
