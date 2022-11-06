import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const store = useSelector((store) => store);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!store.auth.isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div>
      {/* {!store.auth.isLoggedIn ? navigate("/login") : null} */}
      <h1>Home</h1>
      {/* {console.log(store)} */}
      my account details: {JSON.stringify(store)}
    </div>
  );
}

export default Home;
