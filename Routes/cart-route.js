const { response } = require("express");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
require("dotenv").config();
const STORENAME = process.env.STORENAME;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const STOREFRONT_ACCESS_TOKEN = process.env.STOREFRONT_ACCESS_TOKEN;

//creates new cart
router.post("/newcart", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/2022-07/graphql.json`,
      `mutation{
            cartCreate(input:{
              buyerIdentity:{
                customerAccessToken:"${req.body.accessToken}"
              }
            }){
              cart{
                id
                createdAt
                updatedAt
                buyerIdentity {
                    customer{
                        firstName
                        lastName
                        email
                      } 
                  
                }
              }
              userErrors {
                field
                message
              }
            }
          }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      res.send(response.data.data);
    });
});

//fetching cart body {cartId}
router.post("/getcart", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/2022-07/graphql.json`,
      `query {
    cart(
      id: "${req.body.cartId}"
    ) {
      id
      createdAt
      updatedAt
      lines(first:100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                      title
                    image{
                      url
                    }
                    unitPrice{
                      amount
                      currencyCode
                    }
                    priceV2{
                      amount
                      currencyCode
                    }
                    product{
                      title  
                      description
                    }
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        customer {
            firstName
            lastName
            email
        }
      }
    }
  }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
});

//adding new item to cart. body{cartId,productId,quantity}
router.post("/addtocart", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/2022-07/graphql.json`,
      `mutation {
        cartLinesAdd(cartId:"${req.body.cartId}",lines:[
          {
            merchandiseId:"${req.body.productId}"
            quantity:${req.body.quantity}
          }
        ]){
          cart{
            id
            createdAt
            updatedAt
            lines(first:100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    image{
                      url
                    }
                    unitPrice{
                      amount
                      currencyCode
                    }
                    priceV2{
                      amount
                      currencyCode
                    }
                    product{
                      title  
                      description
                    }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
            buyerIdentity {
              customer {
                  firstName
                  lastName
                  email
              }
            }
          }
          userErrors{
            field
            message
          }
        }
      }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
});

//removes item from cart. body{cartId,productLineId}
router.post("/removefromcart", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/2022-07/graphql.json`,
      `mutation {
        cartLinesRemove(cartId:"${req.body.cartId}",lineIds:[
          "${req.body.productLineId}"
        ]){
          cart{
            id
            createdAt
            updatedAt
            lines(first:100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    image{
                      url
                    }
                    unitPrice{
                      amount
                      currencyCode
                    }
                    priceV2{
                      amount
                      currencyCode
                    }
                    product{
                      title  
                      description
                    }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
            buyerIdentity {
              customer {
                  firstName
                  lastName
                  email
              }
            }
          }
          userErrors{
            field
            message
          }
        }
      }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
});

//updates quantity. body{cartId,productLineId,quantity}
router.post("/updateQuantity", (req, res) => {
  axios
    .post(
      `https://${STORENAME}.myshopify.com/api/2022-07/graphql.json`,
      `mutation {
        cartLinesUpdate(cartId:"${req.body.cartId}",lines:[
          {
            id:"${req.body.productLineId}"
            quantity:${req.body.quantity}
          }
        ]){
          cart{
            id
            createdAt
            updatedAt
            lines(first:100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    image{
                      url
                    }
                    unitPrice{
                      amount
                      currencyCode
                    }
                    priceV2{
                      amount
                      currencyCode
                    }
                    product{
                      title  
                      description
                    }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
            buyerIdentity {
              customer {
                  firstName
                  lastName
                  email
              }
            }
          }
          userErrors{
            field
            message
          }
        }
      }`,
      {
        headers: {
          "Content-Type": "application/graphql",
          "Access-Control-Origin": "*",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
});

module.exports = router;
