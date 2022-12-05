import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        </>
      ) : (
        <>
          <h3> Welcome to our bank</h3>
          <h4>Please Login or Signup to use our services</h4>
        </>
      )}
      <p className="border">
        You can check your account balance, get your Account statement pay your
        bills, Recharge your mobile and much more in a secure environment
        <br />
        Our internet banking portal provides personal banking services that
        gives you complete control over all your banking demands online.
      </p>
      <div className="border center flex-col">
        <h3 className="center">Quick Links</h3>
        <div className="flex-row center" style={{ gap: "1rem" }}>
          <Link className="border" to="/account/account-details">
            View Account Details
          </Link>
          <Link className="border" to="/account/view-balance">
            View Account Balance
          </Link>
          <Link to="/transfer-funds" className="border">
            Transfer Funds
          </Link>
          <Link to="/bills" className="border">
            Pay Bills
          </Link>
          <Link to="/history" className="border">
            Transaction History
          </Link>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Home;
