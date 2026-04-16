import React, { useState } from "react";
import PublicLayout from "../Component/PublicLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const userId = localStorage.getItem("userId");
  const [paymentMode, setPaymentMode] = useState("");
  const [address, setAddress] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (paymentMode === "online") {
      const { cardNumber, expiry, cvv } = cardDetails; // Destructuring

      if (!cardNumber || !expiry || !cvv) {
        toast.error("please fill in all card details");
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            address: address,
            paymentMode: paymentMode,
            cardNumber: paymentMode === "online" ? cardDetails.cardNumber : "",
            expiry: paymentMode === "online" ? cardDetails.expiry : "",
            cvv: paymentMode === "online" ? cardDetails.cvv : "",
          }),
        });
        const result = await response.json();

        if (response.status === 201) {
          toast.success(result.message);
          setTimeout(() => {
            navigate("/my-orders");
          }, 2000);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Server is not running..");
      }
    }
  };
  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-credit-card me-2"></i>Checkout & Payment
        </h3>
        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Delivery Address
            </label>
            <textarea
              name=""
              id=""
              className="form-control border-primary-subtle"
              rows="3"
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => paymentMode("cod")}
            ></textarea>
          </div>
          <div className="mb-3 form-check">
            <input
              id="cod"
              type="radio"
              className="form-check-input"
              value="online"
              checked={paymentMode === "cod"}
              onChange={(e) => setPaymentMode("cod")}
            />
            <label htmlFor="cod" className="form-label fw-semibold">
              Cash on Delivery
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              id="online"
              type="radio"
              className="form-check-input"
              value="online"
              checked={paymentMode === "online"} // checked because in checked define in backend model
              onChange={(e) => setPaymentMode("online")}
            />
            <label htmlFor="online" className="form-label fw-semibold">
              Online Payment
            </label>
          </div>
          {paymentMode === "online" && (
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your card number"
                  value={cardDetails.cardNumber}
                  onClick={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onClick={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiry: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="***"
                  value={cardDetails.cvv}
                  onClick={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cvv: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <button className="btn btn-success mt-4 w-100">
            <i className="fas fa-check-circle me-2"></i>
            Pay Now</button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PaymentPage;
