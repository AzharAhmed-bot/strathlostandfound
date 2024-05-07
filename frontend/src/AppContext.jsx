// AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLostAndFound } from '../redux/lostandfoundSlicer';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from Redux and set it in the context
    dispatch(fetchLostAndFound("/lost_items")).then((itemsData) => {
      setItems(itemsData.payload);
    });

    dispatch(fetchLostAndFound("/claims")).then((claimsData) => {
      setClaims(claimsData.payload);
    });

    
    dispatch(fetchLostAndFound("/categories")).then((categoriesData) => {
      setCategories(categoriesData.payload);
    });

    dispatch(fetchLostAndFound("/reviews")).then((reviewsData) => {
      setReviews(reviewsData.payload);
    });
  }, [dispatch]);

  return (
    <AppContext.Provider value={{ items, setItems, claims, setClaims, categories, setCategories, reviews, setReviews }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
