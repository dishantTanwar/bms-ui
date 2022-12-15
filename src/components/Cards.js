import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Cards() {
  //   const [pin, setPin] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const generateCard = (pin) => {
    const card = {
      cardtype: "DEBIT",
      cardno: Math.floor(
        Math.pow(10, 15) + Math.random() * (Math.pow(10, 15) * 9)
      ),
      pin: pin,
      cvv: Math.floor(100 + Math.random() * 900),
      validthru: `${new Date().getMonth()}/${(new Date().getYear() % 100) + 4}`,
      status: "active",
      phoneNo: user.phoneNumber,
    };
    return card;
  };
  const [myCard, setMyCard] = useState(generateCard(1020));
  return (
    <div className="outlet border">
      {/* <p>{JSON.stringify(generateCard(1020))}</p> */}
      <div className="card-container flex-col">
        <h1 className="center">Your Card</h1>
        <div className="card">
          <h3 className="flex center">Bank of Manchester</h3>

          {/* <p>{`${myCard.cardno.toString().slice(0, 4)}-${myCard.cardno
            .toString()
            .slice(4, 8)}-${myCard.cardno
            .toString()
            .slice(8, 12)}-${myCard.cardno.toString().slice(12)}`}</p> */}
          <p>{`${8978} - XXXX - XXXX - ${myCard.cardno
            .toString()
            .slice(12)}`}</p>
          <div className="flex-row ">
            <p
              style={{
                paddingRight: "1rem",
              }}
            >
              VALID THRU {myCard.validthru}
            </p>
            <p> CVV {myCard.cvv}</p>
          </div>
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
