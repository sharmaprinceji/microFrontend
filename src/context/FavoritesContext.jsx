import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

  const { isAuthenticated } = useAuth();

  const [favorites, setFavorites] = useState([]);


  // load favorites from backend
  const loadFavorites = async () => {

    if (!isAuthenticated) {

      setFavorites([]);

      return;
    }

    try {

      const res = await API.get("/products/favorites");

      const ids =
        res.data.data.map(p => p._id);

      setFavorites(ids);

    } catch {

      setFavorites([]);
    }
  };


  useEffect(() => {

    loadFavorites();

  }, [isAuthenticated]);


  // toggle favorite globally
  const toggleFavorite = async (productId) => {

    if (!isAuthenticated) {

      toast.error("Please login");

      return false;
    }

    try {

      const res =
        await API.post(
          `/products/${productId}/favorite`
        );

      const isFav =
        res.data.isFavorite;

      setFavorites(prev =>

        isFav
          ? [...prev, productId]
          : prev.filter(id => id !== productId)

      );

      return isFav;

    } catch {

      toast.error("Failed");

      return false;
    }
  };


  const isFavorite = (productId) =>

    favorites.includes(productId);


  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        loadFavorites
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );
};


export const useFavorites = () =>
  useContext(FavoritesContext);
