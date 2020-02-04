var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1',
  database : 'addressesCRUD',
  multipleStatements: true
});*/
 
var db = require('../db');
router.get('/addresses', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql = `select * from addresses order by addressId desc limit ${limit} offset ${offset};select count(*) as count from addresses`;
  var data = {};  
connection.query(sql, function (error, results, fields) {
  	if (error) throw error;
  		data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 

});
  
router.post('/addresses/:id', function(req, res, next) {
  var addressId = req.params.id;
  var streetName = req.body.streetName;
  var streetAddress = req.body.streetAddress;
  var city = req.body.city;
  var country = req.body.country;
  var zipCode = req.body.zipCode;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var sql = `update addresses set streetName='${streetName}', streetAddress='${streetAddress}', city='${city}', country='${country}', zipCode='${zipCode}', latitude='${latitude}',longitude='${longitude}' where addressId='${addressId}'`;
  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/deleteAddress/:id', function(req, res, next) {
  var addressId = req.params.id;
  var sql = `delete from addresses where addressId=${addressId}`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json({ code : 1 });

});

});  

router.post('/addresses', function(req, res, next) {
var streetName = req.body.streetName;
  var streetAddress = req.body.streetAddress;
  var city = req.body.city;
  var country = req.body.country;
  var zipCode = req.body.zipCode;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude  
var sql = `insert into addresses (streetName, streetAddress, city, country, zipCode, latitude, longitude) values ('${streetName}','${streetAddress}','${city}','${country}','${zipCode}','${latitude}','${longitude}')`;
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
            res.json({ code : 1 });
});
});

router.get('/searchAddress', function(req, res, next) {
  var page = Number(req.query.page);
  var limit = Number(req.query.limit);
  var offset = ((page - 1) * limit) + "";
  var sql1 = `select * from addresses`;
  var sql2 = `select count(*) as count from addresses`;
  var term = req.query.term;
	if (term !== ""){
            sql1 += " where streetName like '%" + term + "%'";
            sql2 += " where streetName like '%" + term + "%'";
        }
  sql1 += ` order by addressId desc limit ${limit} offset ${offset}`;
  var sql = sql1 + ";" + sql2;
var data = {};  
connection.query(sql, function (error, results, fields) {
        if (error) throw error;
                data["code"] = 0;
            data["msg"] = "";
            data["count"] = results[1][0]["count"];
            data["data"] = results[0];
            res.json(data);
}); 
  
});
module.exports = router;
