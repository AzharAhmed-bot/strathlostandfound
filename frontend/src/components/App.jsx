
import { useState, useEffect,useMemo,useCallback} from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { fetchLostAndFound } from '../../redux/lostandfoundSlicer';
import "./App.css";

/**
 * The main App component that serves as the entry point for the application.
 * It fetches data from the Redux store and sets up the routing for the application.
 */
function App() {
  const dispatch=useDispatch()
  const [categories, setCategories] = useState("");
  const [items, setItems] = useState("");
  const [reviews, setReviews] = useState("");
  const [claims, setClaims] = useState("");

useEffect(() => {
   
    // Inside the useEffect hook
    const fetchData = async () => {
      try {
        const [categoriesData, itemsData, claimsData,reviewData] = await Promise.all([
          dispatch(fetchLostAndFound("/categories")),
          dispatch(fetchLostAndFound("/lost_items")),
          dispatch(fetchLostAndFound("/claims")),
          dispatch(fetchLostAndFound("/reviews"))
      
        ]);
  
          setCategories(categoriesData.payload);
          setItems(itemsData.payload);
          setClaims(claimsData.payload);
          setReviews(reviewData.payload);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  fetchData();
}, [dispatch]);


/**
 * A function that returns the items state variable.
 */
const getItems =useCallback(() => items,[items]); 
/**
 * A function that returns the claims state variable.
 */
const getClaims = useCallback(() => claims, [claims]);



// User info needed in AdminPanel ,Forget and Reset Password
// To address the potential performance issue with the routes array being recreated on every render
const routes = [
    { path: "/", element: <LandingPage /> },
    { path: '/login', element: <Login/> },
    { path: '/signup', element: <SignIn /> },
    { path: '/faq', element: <AboutPage reviews={reviews}/> },
    { path: '/home', element: <Home items={items} categories={categories}  /> },
    { path: '/home/post', element: <PrivateRoute><PostItem categories={categories} /></PrivateRoute> },
    { path: '/home/claim', element: <PrivateRoute><MyClaimcard categories={categories} items={items} /></PrivateRoute> },
    { path: '/home/myHistory', element: <PrivateRoute><MyHistory claims={claims} categories={categories} items={items} /></PrivateRoute> },
    { path:'/home/dashboard/user',element:<PrivateRoute> <UserDashboard    /></PrivateRoute>},
    { path:'/home/dashboard/statistics',element:<PrivateRoute>  <ItemDashboard items={items} claims={claims} categories={categories}/></PrivateRoute>},
    { path:'/home/dashboard/faq',element: <PrivateRoute> <FaqDashboard reviews={reviews}/></PrivateRoute>},
    { path: '/nonexisting-claim', element: <PrivateRoute><NonExistingClaim categories={categories} /></PrivateRoute> },
    { path: '/admin', element: <PrivateRoute><AdminPanel/></PrivateRoute> },
    { path: "/Adminnon-existingClaim", element: <PrivateRoute><AdminNonExistingClaim claims={claims} items={items} getClaim={getClaims} categories={categories}  /></PrivateRoute> },
    { path: '/forgot', element: <Forgot  /> },
    { path: '/reset/:id', element: <ResetPassowrd /> },
];

 

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
