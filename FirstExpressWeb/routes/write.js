var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('sync-request');

/* POST users listing. */
router.post('/', function(req, res, next) {
  create_sensor(req.body.mydata);
  res.send('received data = ' + req.body.mydata);
});

//新增SENSOR(包含DESCRIPTOR和DATA)
function create_sensor(sensor_name){

  //新增SENSOR
  headers = {
    "X-M2M-Origin": "admin:admin",
    "Content-Type": "application/xml;ty=2"
  }
  body = 	
  `<m2m:ae xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="${sensor_name}" >
      <api>app-sensor</api>
      <lbl>Type/sensor Category/temperature Location/home</lbl>
      <rr>false</rr>
  </m2m:ae>`
  var res = request('POST', 'http://jeff.frp.morrisnet.top/~/mn-cse' , {headers : headers , body : body});
  console.log(res.getBody('utf-8'));
  //新增SENSOR

  //新增SENSOR同時也要創建"DESCRIPTOR"和"DATA"
  create_descriptor(sensor_name);  //新增DESCRIPTOR
  create_data(sensor_name);  //新增DATA

}

//create_sensor('test20201209');  //debug
//新增SENSOR(包含DESCRIPTOR和DATA)




//新增DESCRIPTOR
function create_descriptor(sensor_name){
  headers = {
    "X-M2M-Origin": "admin:admin",
    "Content-Type": "application/xml;ty=3"
  }
  body = 	
  `<m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="DESCRIPTOR">
  </m2m:cnt>`
  var res = request('POST', 'http://jeff.frp.morrisnet.top/~/mn-cse/mn-name/' + sensor_name , {headers : headers , body : body});
  console.log(res.getBody('utf-8'));
}

//create_descriptor('test');  //debug
//新增DESCRIPTOR


//新增DATA
function create_data(sensor_name){
  headers = {
    "X-M2M-Origin": "admin:admin",
    "Content-Type": "application/xml;ty=3"
  }
  body = 	
  `<m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="DATA">
  </m2m:cnt>`
  var res = request('POST', 'http://jeff.frp.morrisnet.top/~/mn-cse/mn-name/' + sensor_name , {headers : headers , body : body});
  console.log(res.getBody('utf-8'));
}

//create_data('999');  //debug
//新增DATA

//新增DESCRIPTOR裡的內容
function create_descriptor_content(sensor_name){
  headers = {
    "X-M2M-Origin": "admin:admin",
    "Content-Type": "application/xml;ty=4"
  }
  body = 	
  `<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols">
    <cnf>application/xml</cnf>
    <con>
        &lt;obj&gt;
            &lt;str name=&quot;type&quot; val=&quot;Temperature_Sensor&quot;/&gt;
            &lt;str name=&quot;location&quot; val=&quot;Home&quot;/&gt;
            &lt;str name=&quot;appId&quot; val=&quot;MY_SENSOR&quot;/&gt;
            &lt;op name=&quot;getValue&quot; href=&quot;/in-cse/in-name/MY_SENSOR/DATA/la&quot; 
        in=&quot;obix:Nil&quot; out=&quot;obix:Nil&quot; is=&quot;retrieve&quot;/&gt;
        &lt;/obj&gt;
    </con>
  </m2m:cin>`

  var res = request('POST', 'http://jeff.frp.morrisnet.top/~/mn-cse/mn-name/' + sensor_name + '/DESCRIPTOR', {headers : headers , body : body});
  console.log(res.getBody('utf-8'));
}
//create_descriptor_content('999');  //debug
//新增DESCRIPTOR裡的內容


//新增DATA裡的內容
function create_data_content(sensor_name){
  headers = {
    "X-M2M-Origin": "admin:admin",
    "Content-Type": "application/xml;ty=4"
  }
  body = 	
  `<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols">
    <cnf>message</cnf>
    <con>
      &lt;obj&gt;
        &lt;str name=&quot;appId&quot; val=&quot;MY_SENSOR&quot;/&gt;
        &lt;str name=&quot;category&quot; val=&quot;temperature &quot;/&gt;
        &lt;int name=&quot;data&quot; val=&quot;27&quot;/&gt;
        &lt;int name=&quot;unit&quot; val=&quot;celsius&quot;/&gt;
      &lt;/obj&gt;
    </con>
  </m2m:cin>`

  var res = request('POST', 'http://jeff.frp.morrisnet.top/~/mn-cse/mn-name/' + sensor_name + '/DATA', {headers : headers , body : body});
  console.log(res.getBody('utf-8'));
}
//create_data_content('999');  //debug
//新增DATA裡的內容


module.exports = router;
