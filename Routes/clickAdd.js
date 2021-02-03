const { Router } = require('express');
const router = require('express').Router();
const ClickData = require('../Models/clickdata');

var dateString = '';

router.post('/addClick', async (req, res) => {

    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    dateString = year+"/"+month;

    ClickData.findOne({ userEmail: req.body.userEmail }).then(clickData => {
        if (clickData) {
            ClickData.collection.update(
                { "userEmail":req.body.userEmail},
                {"$inc": {"clickAmount":1}}
            )
          } else {
            const newClickData = new ClickData({
                userEmail: req.body.userEmail,
                clickYearMonth: this.dateString,
                clickAmount: 1
            });

          }
        });
})

module.exports = router
