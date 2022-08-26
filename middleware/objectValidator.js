const Joi = require('joi');



const objectValidate = async (req, res, next) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    
    body = req.body
    const schema = Joi.object({
        district_id: Joi.number(),
        date: Joi.string(),
        limit: Joi.number()

    })
    try {
         await schema.validateAsync(body);
        if (!body.limit || body.limit > 20) {
            body.limit = 10
        }
        let date = body.date
        dateArray = date.split("-")
        var result = dateArray.map(function (x) { 
            return parseInt(x, 10); 
          });
        if (result[0]>=dd && result[1]>=mm && result[2]>=yyyy) {
            console.log("validation pass");
            next()
        }
        else {
            console.log("not passed");
            return res.status(500).send({
                code: 500,
                message: "Bad INPUT! Please check your date format (dd-mm-yyyy)"
            })
        }
    }
    catch (error) {
        return res.status(500).send(res.status(500).send({
            "code": 500,
            "message": error.message
        }))
    }
}

module.exports = objectValidate