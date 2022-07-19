const { response } = require("express");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const STORENAME = process.env.STORENAME;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const STOREFRONT_ACCESS_TOKEN = process.env.STOREFRONT_ACCESS_TOKEN;
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

router.post("/login", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/graphql.json`,
      `mutation { customerAccessTokenCreate(input: {email: "${req.body.email}", password: "${req.body.password}"}) { customerAccessToken { accessToken, expiresAt }, customerUserErrors { code } } }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      if (
        response.data.data?.customerAccessTokenCreate.customerUserErrors
          .length ||
        response.data.errors?.length
      ) {
        return res
          .status(404)
          .send(
            response.data.data
              ? response.data.data.customerAccessTokenCreate.customerUserErrors
              : response.data.errors
          );
      }
      res.send(
        response.data.data.customerAccessTokenCreate.customerAccessToken
      );
    });
});

module.exports = router;
