const express = require(`express`),
    router = express.Router();

router.get(`/:category`, (req, res) => {
    const capitalisedCategory = req.params.category[0].toUpperCase() + req.params.category.slice(1);
    res.render(`shop/catalog`, {
        docTitle: `${capitalisedCategory} Products`,
        pageHeading: `FIND YOUR BEST TRAINERS`
    });
});

module.exports = router;