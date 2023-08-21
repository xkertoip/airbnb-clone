import {Suspense, lazy} from 'react';
import { Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import {AuthContextProvider} from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./util/ProtectedRoutes";
import GuestRoutes from './util/GuestRoutes';
import Layout from './layouts/Layout';

const Index = lazy(() => import('./pages/IndexPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));

function App() {


    return (
      <AuthContextProvider>
          <Layout>
              <Suspense fallback={<span>Loading...</span>}>
                  <Routes>
                      <Route path={'/'}>
                          <Route index element={<Index/>}/>
                          <Route path={'/login'} element={<GuestRoutes>
                              <Login/>
                          </GuestRoutes>}/>
                          <Route path={'/register'} element={<Register/>}/>
                          <Route path={"/"} element={<ProtectedRoutes/>}>
                              <Route path={'/profile/:subpage?'} element={<ProfilePage/>}/>
                              <Route path={'/profile/:subpage/:action?'} element={<ProfilePage/>}/>
                          </Route>
                      </Route>
                  </Routes>
              </Suspense>
          </Layout>
      </AuthContextProvider>

  )
}


export default App
