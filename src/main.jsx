
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <AuthProvider>

    <FavoritesProvider>

      <App />

      <ToastContainer />

    </FavoritesProvider>

  </AuthProvider>

);
