import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );


  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth <= 768);

      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);


  const handleLogout = () => {

    logout();

    navigate("/login");

    setMenuOpen(false);
  };

  const getLinkStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  padding: "6px 12px",
  borderRadius: "6px",
  background: isActive ? "#2ecc71" : "transparent",
  transition: "all 0.2s ease"
});



  return (

    <motion.nav
      style={styles.nav}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
    >

      {/* LEFT SIDE */}
      <div style={styles.leftSection}>

        <NavLink to="/" style={styles.logo}>
          🛒 MicroMarket
        </NavLink>

        {!isMobile && (
          <NavLink
            to="/products"
           style={getLinkStyle}
          >
            Products
          </NavLink>
        )}

       {isAuthenticated && (
            <NavLink
              to="/favorites"
             style={getLinkStyle}
            >
              Favorites ❤️
            </NavLink>
          )}

      </div>


      {/* RIGHT SIDE DESKTOP */}
      {!isMobile && (
        <div style={styles.rightSection}>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                style={getLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                // style={styles.link}
                style={getLinkStyle}
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={styles.logout}
            >
              Logout
            </button>
          )}

        </div>
      )}


      {/* HAMBURGER MOBILE */}
      {isMobile && (

        <div
          style={styles.hamburger}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </div>

      )}


      {/* MOBILE MENU */}
      {isMobile && menuOpen && (

        <motion.div
          style={styles.mobileMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <NavLink
            to="/products"
            style={styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>


          {isAuthenticated && (
            <NavLink
              to="/favorites"
              style={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Favorites ❤️
            </NavLink>
          )}


          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                style={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                style={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}


          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={styles.logout}
            >
              Logout
            </button>
          )}

        </motion.div>

      )}

    </motion.nav>
  );
}


const styles = {

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#141e30",
    padding: "12px 20px",
    color: "white",
    flexWrap: "wrap",
    position: "relative"
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  },

  logout: {
    background: "#ff4757",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },

  hamburger: {
    fontSize: "26px",
    cursor: "pointer"
  },

  mobileMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px"
  }

};
