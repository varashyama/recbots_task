import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignUp from './components/signup';
import SignIn from './components/signin';
import Dashboard from './components/dashboard';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SignUp />} ></Route>
          <Route path="/signin" element={<SignIn />} ></Route>
          <Route path="/dashboard/:id" element={<Dashboard />} ></Route>
          <Route path="*" element={<Navigate to="/" />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
