# JavaScript-NodeJs-Restful-Api
A restful Api written with node js , MongoDb
# To test for API 1

GO TO 
https://javascriptapi.herokuapp.com/product
it will return a json file of all products

# to test for 2

from one copy request.url of any product then open in your browser
It is of the form https://javascriptapi.herokuapp.com/product/anyid


#to test for 3
go to
https://javascriptapi.herokuapp.com/web
and fill the form then submit

other fuctions in the api is patch(update)
send a patch request to https://javascriptapi.herokuapp.com/product/anyid
   //sent json should be of this form

    // [
	
    //     {"propName": "name", "value": "new movie"}	,	{"propName": "price", "value": "7000"},	{"propName": "description", "value": "new movie description"}
        
    // ]

delete
send a delete request request to https://javascriptapi.herokuapp.com/product/anyid

