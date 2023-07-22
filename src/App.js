import Home from "./routes/home/home.component";
import {Routes, Route} from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import SignIn from "./routes/sign-in/sign-in.component";  
// the Route component with the index prop is the default route that will be rendered when the path matches the parent path
// so the navigation component will be rendered when the path matches the / path and the home component will also be rendered 
// under that path because of the index prop
const App = () => {
  return (
    <Routes>
      <Route path="/" element= {<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  )
};

  


export default App;
