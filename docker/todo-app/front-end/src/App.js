import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';

import { TaskProvider } from './context/taskContext';
import TaskReset from "./components/TaskReset";
import UserRegistration from "./pages/UserRegistration";
import Tasks from "./pages/Tasks";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <main className="App">
      <Router>
        <Switch>
          <Route path="/registration" component={ UserRegistration } />
          <Route path="/login" component={ UserLogin } />
          <Route exact={true} path="/">
            <Redirect to="/login" />
          </Route>
          <TaskProvider>
            <Route exact={true} path="/tasks" component={ Tasks }/>
            <Route exact={true} path="/debug">
              <TaskReset />
            </Route>
          </TaskProvider>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
