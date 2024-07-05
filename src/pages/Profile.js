import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Profile() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
