import React from "react";
import Home from "./routes/Home";
import { Route } from 'react-router-dom'
import UserDetail from "./components/UserDetail";
import Evaluation from "./components/Evaluation";
import EvaluationCard from "./components/EvaluationCard";


const App = ()=>  {
  

  return (
    <>
     <Route path='/' exact component={Home} />
     <Route path='/user/:id' component={UserDetail} />
     <Route path='/evaluation' component={Evaluation} />
     <Route path='/evaluations/:id' exact component={EvaluationCard}/>
    </>
  );
}

export default App;
