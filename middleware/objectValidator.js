const { number } = require('joi');
const Joi = require('joi');



const objectValidate = async (req, res, next) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    
    
    try {
        body = req.body
        if(typeof(body.district_id)=="number"&&typeof(body.date)=="string"&&typeof(body.limit)=="number"){
        if (!body.limit || body.limit > 20) {
            body.limit = 10
        }
        let date = body.date
        dateArray = date.split("-")
        var result = dateArray.map(function (x) { 
            return parseInt(x, 10); 
          });
        if (result[0]>=dd && result[1]>=mm && result[1]<12 && result[2]>=yyyy) {
            console.log("validation pass");
            next()
        }
        else {
            console.log("not passed");
            return res.status(500).send({
                code: 500,
                message: "Please enter Today's date or future Date, (DD-MM-YYYY)"
            })
        }
    }else{
        if(typeof(body.district_id)!="number"){
            return res.status(500).send({
                code: 500,
                message: "Invalid District Id!, District id must be a Number"
            })
        }else if(typeof(body.date)!="string"){
            return res.status(500).send({
                code: 500,
                message: "Invalid Date!, Date must me a String"
            })
        }else if(typeof(body.limit)!="number"){
            return res.status(500).send({
                code: 500,
                message: "Invalid Limit!, Limit must me a Number"
            })
        }
    }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(res.status(500).send({
            "code": 500,
            "message": error.message
        }))
    }
}

module.exports = objectValidate