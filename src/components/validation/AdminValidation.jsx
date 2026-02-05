import { useQuery } from "@tanstack/react-query";
import { userDetail } from "../../lib/api/UserApi";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const AdminValidation = ({ children }) => {
  const [accessToken] = useLocalStorage("access-token", "");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { data: currentUser, isError } = useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      const response = await userDetail(accessToken);
      const responseBody = await response.json();

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      } else {
        setIsAdmin(responseBody.data?.role === "admin");
      }

      return responseBody.data;
    },
    enabled: !!accessToken,
  });

  //   const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (currentUser) {
      if (!isAdmin) navigate("/");
    }
    if (!accessToken || isError) navigate("/");
  }, [accessToken, isError, navigate, currentUser]);

  return isAdmin ? children : null;
};

export default AdminValidation;
