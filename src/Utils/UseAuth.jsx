// useAuth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (isLoggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [isLoggedIn, navigate]);

  return;
};

export default useAuth;
