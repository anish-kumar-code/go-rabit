const express = require("express");

const adminRoutes = require("./adminRoutes");
const vendorRoutes = require("./vendorRoutes");
const userRoutes = require("./userRoutes");

exports.appRoutes = (app) => {
  app.use("/public", express.static("public"));
  app.use("/api/admin", adminRoutes);
  app.use("/api/vendor", vendorRoutes);
  app.use("/api/user", userRoutes)
};
