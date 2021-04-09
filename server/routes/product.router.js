const router = require("express").Router();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WOO_SITE_URL,
    consumerKey: process.env.WOO_CONSUMER_KEY,
    consumerSecret: process.env.WOO_CONSUMER_SEC,
    version: 'wc/v3'
});

router.get("/all", (req, res) => {
      
      // console.log(res)
    WooCommerce.get('products')
      .then((response) => {
        if(response){
          res.json(response.data);
        }
        else{
          res.status(404).send("No Product");
        }
      })
      .catch((error) =>{
        res.status(500).send({"Error": error.message});
      });
});

router.get("/:_id", (req, res) => {
    const _id = req.params._id;
    console.log("_id", _id)
    WooCommerce.get('products/'+_id)
        .then((response) =>{
          if(response){
            res.json(response.data)
          }
          else{
            res.status(404).send("No data")
          }
            
        })
        .catch((error) =>{
          res.status(500).send({"Error": error.message});
        });
});

router.get("/add", (req, res) => {
    res.json({
      error: null,
      data: {
        title: "Product Detail",
        content: "Content goes here.",
        user: req.user,
      },
    });
});

module.exports = router;