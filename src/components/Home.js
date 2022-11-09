import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const auth = useSelector((store) => store.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!store.auth.isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div className="center home flex-col">
      {/* {!store.auth.isLoggedIn ? navigate("/login") : null} */}
      <h1 className="center">Home</h1>
      {auth?.user?.firstName ? (
        <>
          <h3> Welcome {auth.user.firstName} </h3>
          <p>Please use the Navigation Window to complete your action</p>
        </>
      ) : (
        <>
          <h3> Welcome to our bank</h3>
          <h4>Please Login or Signup to use our services</h4>
        </>
      )}
      <p>
        You can check your account balance, get your A/c statement pay your
        bills,Recharge your mobile and much more in a secure environment
      </p>
      <p>
        Our internet banking portal provides personal banking services that
        gives you complete control over all your banking demands online.
      </p>
    </div>
  );
}

export default Home;
