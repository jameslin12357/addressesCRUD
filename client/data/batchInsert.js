var mysql      = require('mysql');
var faker = require('faker');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '1',
  database : 'addressesCRUD'
});

connection.connect();
for (var i = 0; i < 3000; i++){
  var streetName = faker.address.streetName();
  var streetAddress = faker.address.streetAddress();
  var city = faker.address.city();
  var country = faker.address.country();
  var zipCode = faker.address.zipCode();
  var latitude = faker.address.latitude();
  var longitude = faker.address.longitude();
  var sql = `insert into addresses(streetName, streetAddress, city, country, zipCode, latitude, longitude) values ("${streetName}","${streetAddress}","${city}","${country}","${zipCode}","${latitude}","${longitude}")`;
	connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
}

connection.end();
