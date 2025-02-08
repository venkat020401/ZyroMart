import { useCart } from "../context/CartContext";

const Orders = () => {
  const { orders = [] } = useCart();
  return (
    <div className="container mt-4">
      <h5 className="fw-bold">My Orders</h5>
      {orders.length === 0 ? (
        <p className="text-muted text-center">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white p-3 mb-3 rounded shadow-sm border">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              
              <div className="d-flex align-items-center">
                <img
                  src={order.image}
                  className="img-fluid rounded"
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
  
                <div className="ms-3">
                  <h6 className="mb-1">{order.name}</h6>
                  <p className="text-muted mb-1">
                    <strong>Color:</strong> {order.color} | <strong>Size:</strong> {order.size || "N/A"}
                  </p>
                  <h6 className="fw-bold">
                    ₹{(order.sellingPrice * order.qty).toLocaleString("en-IN")}
                    <span className="text-muted" style={{ fontSize: "12px" }}> &nbsp; ({order.qty} No's)</span>
                  </h6>
                </div>
              </div>
  
              <div className="text-start text-md-end mt-2 mt-md-0">
  <p className="text-success fw-bold mb-0">
    <i className="bi bi-circle-fill me-1" style={{ fontSize: "6px", position: "relative", top: "-3px" }}></i> Delivered
  </p>
</div>

  
            </div>
          </div>
        ))
      )}
    </div>
  );
  
  
  
};

export default Orders;
