import React from "react";
import Home from "../routes/Home";
import { Route, Switch } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import Evaluation from "../components/Evaluation";
import EvaluationCard from "../components/EvaluationCard";
import Login from "../components/Login";
import Education from "../components/Education";

const AppRouter = () => {

  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path='/:adminid/:adminpw' exact component={Home}/>
      <Switch>
        <Route path="/:adminid/user/:id" exact component={UserDetail} />
        <Route path="/:adminid/evaluation" exact component={Evaluation} />
        <Route path="/:adminid/evaluations/:id" exact component={EvaluationCard} />
        <Route path="/:adminid/education" exact component={Education} />
      </Switch>
    </>
  );
};

export default AppRouter;
