import LandingPage from './Common/Hero/LandingPage';
import Login from './Common/Auth/Login';
import SignIn from './Common/Auth/SignUp';
import AboutPage from './Common/FAQSection/About';
import Home from './Common/LostAndFound/Home';
import PrivateRoute from './Common/Auth/PrivateRoute';
import PostItem from './Common/LostAndFound/PostItem';
import MyClaimcard from './User/MyClaimcard';
import AdminPanel from './Admin/AdminPanel';
import Forgot from './Common/Auth/Forgot';
import ResetPassowrd from './Common/Auth/ResetPassword';
import NonExistingClaim from './User/NonExistingClaim';
import MyHistory from './User/MyHistory';
import UserDashboard from './AdminDashboard/Dashboard/UserDashboard';
import ItemDashboard from './AdminDashboard/Dashboard/ItemDashboard';
import FaqDashboard from './AdminDashboard/Dashboard/FaqDashboard';
import AdminNonExistingClaim from './Admin/AdminNonExistingClaim';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { useMemo } from 'react';

/**
 * The main App component that serves as the entry point for the application.
 * It fetches data from the Redux store and sets up the routing for the application.
 */
function App() {




  // User info needed in AdminPanel ,Forget and Reset Password
  // To address the potential performance issue with the routes array being recreated on every render
  const routes = useMemo(()=>[
    { path: "/", element: <LandingPage /> },
    { path: '/login', element: <Login/> },
    { path: '/signup', element: <SignIn /> },
    { path: '/faq', element: <AboutPage/> },
    { path: '/home', element: <Home/> },
    { path: '/home/post', element: <PrivateRoute><PostItem/></PrivateRoute> },
    { path: '/home/claim', element: <PrivateRoute><MyClaimcard/></PrivateRoute> },
    { path: '/home/myHistory', element: <PrivateRoute><MyHistory/></PrivateRoute> },
    { path:'/home/dashboard/user',element:<PrivateRoute> <UserDashboard/></PrivateRoute>},
    { path:'/home/dashboard/statistics',element:<PrivateRoute><ItemDashboard/></PrivateRoute>},
    { path:'/home/dashboard/faq',element: <PrivateRoute> <FaqDashboard/></PrivateRoute>},
    { path: '/nonexisting-claim', element: <PrivateRoute><NonExistingClaim/></PrivateRoute> },
    { path: '/admin', element: <PrivateRoute><AdminPanel/></PrivateRoute> },
    { path: "/Adminnon-existingClaim", element: <PrivateRoute><AdminNonExistingClaim /></PrivateRoute> },
    { path: '/forgot', element: <Forgot /> },
    { path: '/reset/:id', element: <ResetPassowrd /> },
  ],[]);
 

return (
  <>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  </>
)}

export default App;
