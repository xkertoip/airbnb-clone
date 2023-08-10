import { Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import { AuthContextProvider} from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.withCredentials=true;
function App() {


  return (
      <AuthContextProvider>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/profile/:subpage?'} element={<ProfilePage/>}/>
                    <Route path={'/profile/:subpage/:action?'} element={<ProfilePage/>}/>
                </Route>
            </Routes>
      </AuthContextProvider>

  )
}

export default App
