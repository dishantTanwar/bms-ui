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

      <br />
      <div className="border">
        {auth?.user?.firstName ? (
          <>
            <h1 className="flex center"> Welcome {auth.user.firstName} </h1>
          </>
        ) : (
          <>
            <h1 className="flex center"> Welcome to our bank</h1>
          </>
        )}
        <br />
        <p>
          You can check your account balance, get your Account statement, Pay
          your bills, and much more in a secure environment.
          <br />
          Our internet banking portal provides personal banking services that
          gives you complete control over all your banking demands online.
        </p>
      </div>
      <br />
      {auth?.user?.firstName ? (
        <div className="border center flex-col">
          <h3 className="center bottom-border">Quick Links</h3>
          <div className="flex-row center" style={{ gap: "1rem" }}>
            <Link
              className="border quick-link center"
              to="/account/account-details"
            >
              View Account Details
            </Link>
            <Link
              className="border quick-link center"
              to="/account/view-balance"
            >
              View Account Balance
            </Link>
            <Link to="/transfer-funds" className="border quick-link center">
              Transfer Funds
            </Link>
            <Link to="/bills" className="border quick-link center">
              Pay Bills
            </Link>
            <Link to="/history" className="border quick-link center">
              Transaction History
            </Link>
            <p></p>
          </div>
        </div>
      ) : (
        <>
          {/* <h4>Please Login or Signup to use our services</h4> */}
          <div className="border center flex-col">
            <h3 className="center">
              Please Login or Signup to use our services
            </h3>
            <div className="flex-row center" style={{ gap: "2rem" }}>
              <Link className="border quick-link center" to="/login">
                Login
              </Link>
              <Link className="border quick-link center" to="/register">
                Register
              </Link>
              <p></p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
