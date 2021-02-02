import React from "react";
import Home from "../routes/Home";
import { Route, Switch } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import Evaluation from "../components/Evaluation";
import EvaluationCard from "../components/EvaluationCard";
import Login from "../components/Login";

const AppRouter = () => {

  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path='/:adminid/:adminpw' exact component={Home}/>
      <Switch>
        <Route path="/:adminid/user/:id" exact component={UserDetail} />
        <Route path="/evaluation" exact component={Evaluation} />
        <Route path="/evaluations/:id" exact component={EvaluationCard} />
      </Switch>
    </>
  );
};

export default AppRouter;
