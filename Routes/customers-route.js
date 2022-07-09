const express = require("express");
const router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const STORENAME = process.env.STORENAME;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

router.post("/customer", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/admin/api/2022-04/customers.json`,
      {
        customer: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          password_confirmation: req.body.password,
        },
      },
      { headers: { "X-Shopify-Access-Token": ACCESS_TOKEN } }
    )
    .then((resp) => res.send(resp.data))
    .catch((err) => {
      //   console.log(err.response.status);
      res.status(err.response.status || 400).send(err.response.data);
    });
});

module.exports = router;
