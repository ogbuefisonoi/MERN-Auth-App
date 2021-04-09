const router = require("express").Router();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WOO_SITE_URL,
    consumerKey: process.env.WOO_CONSUMER_KEY,
    consumerSecret: process.env.WOO_CONSUMER_SEC,
    version: 'wc/v3'
});

router.get("/sales", (req, res) => {
    WooCommerce.get("reports/sales", {
        date_min: "2000-01-01",
        date_max: "2021-05-01"
      })
      .then((response) =>{
          res.json(response.data)
      })
      .catch((error) =>{
        res.status(500).send({"Error": error.message});
        })
});

module.exports = router;