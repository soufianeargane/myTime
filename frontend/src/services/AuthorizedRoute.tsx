import validateToken from "../helpers/ValidateToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const AuthorizedRoute = ({ element, requiredRole }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuthorization() {
      if (user) {
        if (user.role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } else {
        try {
          const result = await validateToken();
          console.log(result);
          if (result.user) {
            dispatch(setUser(result.user));
            if (result.user.role === requiredRole) {
              setIsAuthorized(true);
            } else {
              setIsAuthorized(false);
            }
          } else {
            setIsLogged(true);
          }
        } catch (error) {
          setIsLogged(true);
        }
      }
    }

    checkAuthorization();
  }, [requiredRole, user, dispatch]);

  useEffect(() => {
    if (isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  if (isAuthorized === true) {
    return element;
  } else if (isAuthorized === false) {
    return <div>Unauthorized</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default AuthorizedRoute;
