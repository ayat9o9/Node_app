const router = require("express").Router();

const {
  DoneOrder,
  NewOrder,
  getOrders,
  searchOrdeer,
  UpdateOrder,
  DeleteOrder,
  TotalPriceOrders,
  GroupByOrders,
} = require("../Controller/Order");

router
  .post("/neworder", NewOrder)
  .get("/orders", getOrders)
  .get("/search", searchOrdeer)
  .put("/done/:id", DoneOrder)
  .put("/update/:id", UpdateOrder)
  .delete("/delete/:id", DeleteOrder)
  .get("/total", TotalPriceOrders)
  .get("/groupByOrders", GroupByOrders);

module.exports = router;
