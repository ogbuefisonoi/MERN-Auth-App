const router = require("express").Router();
const WooCommerceAPI = require('woocommerce-api')

const WooCommerce = new WooCommerceAPI({
    url: process.env.WOO_SITE_URL,
    consumerKey: process.env.WOO_CONSUMER_KEY,
    consumerSecret: process.env.WOO_CONSUMER_SEC,
    wpAPI: true,
    version: 'wc/v3'
});

router.get("/products/all", (req, response) => {
    
    
      // console.log(res)
      WooCommerce.get('products',function(err, data, res) {
        response.json( JSON.parse(res) );
        // console.log("data length", data.length);
      });
});

router.get("/products/:_id", (req, response) => {
    const _id = req.params._id;
    console.log("_id", _id)
    async function process() {
        WooCommerce.get('products/'+_id, function(err, data, res) {
            response.json( JSON.parse(res) );
            // console.log("data length", data.length);
          });
    
    //     WooCommerce.get("products/tags/" + _id)
    //     .then((product) => {
    //         if (!product) {
    //         res.status(404).send("No Data");
    //         } else {
    //         NoteModel.findOne({ targetId: _id }, function (err, note) {
    //             if (err || !note) {
    //             res.json(product.data);
    //             } else {
    //             res.json({ ...product.data, userNote: note.userNote });
    //             }
    //         });
    //         }
    //         console.log("Product")
    //     })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });
  }
  process();
});

router.get("/products/add", (req, res) => {
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