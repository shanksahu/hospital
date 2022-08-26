const axios = require('axios').default;

var body, limit

const getHospitalData = async (req, res) => {
    body = req.body
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${body.district_id}&date=${body.date}`)
        .then(function (response) {
            // console.log(response);
            list = response["data"]["centers"]
            data = list.slice(0, body.limit)
            console.log(data.length);
            dataManagement(data, res)
        })
        .catch(function (error) {
            // console.log(error);
            res.status(500).send({
                "code": 500,
                "message": error.message
            })
        });
}

const dataManagement = async (data, res) => {
    try {
        console.log(data[0].sessions);
        let result = []
        data.map(element => {
            obj = {}
            Object.keys(element).forEach(keys => {
                if (keys == "name")
                    obj[keys] = element[keys]
            })
            obj.session = []
            sessionObj = {}
            element.sessions.map(sessionElement => {
                Object.keys(sessionElement).forEach(keys => {
                    if (keys == "available_capacity" || keys == "vaccine") {
                        sessionObj["available_capacity"] = sessionElement["available_capacity"]
                        sessionObj["vaccine"] = sessionElement["vaccine"]
                    }
                })

                obj.session.push(sessionObj)
            })
            result.push(obj)
        })
        res.status(200).send({
            "code": 200,
            "message": "Hospitals sent successfully",
            "result":result
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "code": 500,
            "message": error.message
        })
    }
}

module.exports = getHospitalData