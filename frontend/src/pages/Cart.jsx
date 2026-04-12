import React, { useEffect, useState } from "react";
import PublicLayout from "../Component/PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItem, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItem(data);
        const total = data.reduce(
          (sum, item) => sum + item.food.item_price * item.quantity,
          0,
        ); // calcualte total price
        setGrandTotal(total); // set total price of item
      });
  }, [userId]); // whenever userid will be changed useEffect reload the page

  const updateQuantity = async (orderId, newQty) => {
    if (newQty < 1) return;
    else {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/cart/update_quantity`,
          {
            method: "PUT", // PUT is used for updation
            headers: { "Content-Type": "application/json" },

            // send data to backend
            body: JSON.stringify({
              orderId: orderId,
              quantity: newQty,
            }),
          },
        );
        if (response.status === 200) {
          // you are reloading fresh cart data from backend
          const updated = await fetch(
            `http://127.0.0.1:8000/api/cart/${userId}`,
          );
          const data = await updated.json();
          setCartItem(data);
          const total = data.reduce(
            (sum, items) => sum + items.food.item_price * items.quantity,
            0,
          );
          setGrandTotal(total);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("Server error");
      }
    }
  };
  const deleteCartItem = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this item",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cart/delete/${orderId}/`,
        {
          method: "DELETE",
        },
      );
      if (response.status === 200) {
        // you are reloading fresh cart data from backend
        const updated = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
        const data = await updated.json();
        setCartItem(data);
        const total = data.reduce(
          (sum, items) => sum + items.food.item_price * items.quantity,
          0,
        );
        setGrandTotal(total);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div classNameName="container py-5">
        <h2 className="mb-4 text-center text-muted">
          <FaShoppingCart className="me-2 mb-2" />
          Your Cart
        </h2>
        {cartItem.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <div className="row">
            {cartItem.map((item) => (
              <div className="col-md-6 mb-4" key={item.id}>
                <div className="card shadow-sm">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={`http://127.0.0.1:8000${item.food.image}`}
                        alt="food image"
                        className="img-fluid rounded-start"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.food.item_name}</h5>
                        <p className="card-text text-muted-small">
                          {item.food.item_description?.slice(0, 90)}
                        </p>
                        <p className="fw-bold text-success">
                          ₹{item.food.item_price}
                        </p>
                        <div className="d-flex flex-column align-items-start mb-2">
                          <div className="d-flex align-items-center mb-2">
                            <button
                              className="btn btn-sm btn-outline-secondary me-2"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <FaMinus />
                            </button>

                            <span className="fw-bold mt-1">
                              {item.quantity}
                            </span>

                            <button
                              className="btn btn-sm btn-outline-secondary ms-2"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <button
                            className="btn btn-sm btn-outline-danger px-2"
                            onClick={() => deleteCartItem(item.id)}
                          >
                            <FaTrash className="me-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="card p-4 mt-4 shadow-sm border-0">
          <h4 className="text-end">Total: ₹{grandTotal.toFixed(2)}</h4>
          <div className="text-end">
            <button className="btn btn-primary mt-3 py-3 px-4">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Cart;
