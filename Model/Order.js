const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    cname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "peending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
