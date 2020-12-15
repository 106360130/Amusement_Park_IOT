var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('sync-request');

/* DELETE users listing. */
router.delete('/', function(req, res, next) {
    delete_sensor(req.body.sensor_deleted);
    res.send('Delete sensor : ' + req.body.sensor_deleted);
});


function delete_sensor(sensor_name){

    //刪除SENSOR
    headers = {
        "X-M2M-Origin": "admin:admin",
        "Content-Type": "application/xml;ty=2"
    }
    var res = request('DELETE', 'http://jeff.frp.morrisnet.top/~/mn-cse/mn-name/' + sensor_name , {headers : headers});
    console.log(res.getBody('utf-8'));
    //刪除SENSOR

}
module.exports = router;
//delete_sensor('22');
/*
匯出函式

module.exports = {
    router:router,
    delete_sensor:delete_sensor
};
*/
