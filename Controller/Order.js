const Order = require("../Model/Order");

exports.NewOrder = async (req, res) => {
  try {
    const neworder = await Order.create(req.body);
    res.status(200).json({
      status: true,
      neworder,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.searchOrdeer = async (req, res) => {
  try {
    const searchField = req.query.phone;
    const order = await Order.find({
      phone: { $regex: searchField, $options: "$i" },
    });
    res.status(200).json({
      status: true,
      order,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.DoneOrder = async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: "Accept" } },
      { new: true }
    );
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.UpdateOrder = async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.DeleteOrder = async (req, res) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.TotalPriceOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $match: { status: "Accept" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};

exports.GroupByOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      status: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: "Failed",
      error,
    });
  }
};
