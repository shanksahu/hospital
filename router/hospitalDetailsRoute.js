const getHospitalData = require("../controller/hospitalDetailsController")
const objectValidate = require("../middleware/objectValidator")
const router = require('express').Router()

router.post('/gethospital',objectValidate,getHospitalData)

module.exports = router