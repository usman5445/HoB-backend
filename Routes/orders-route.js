const express = require("express");
const router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const STORENAME = process.env.STORENAME;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
router.get("/orders", (req, res) => {
  axios
    .get(`https://${STORENAME}.myshopify.com/admin/api/2022-04/orders.json`, {
      headers: {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
      },
    })
    .then((resp) => res.send(resp.data))
    .catch((err) => res.status(err.status || 400).send(err));
});

module.exports = router;
