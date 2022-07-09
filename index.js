const { json } = require("express");
const express = require("express");
const PORT = process.env.PORT || 5000
const productsRoute = require("./Routes/products-route");
const ordersRoute = require("./Routes/orders-route");
const customersRoute = require("./Routes/customers-route");
const app = express();
app.use(json());
app.use(productsRoute);
app.use(ordersRoute);
app.use(customersRoute);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
