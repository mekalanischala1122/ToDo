var express = require('express')
/* setting up our application */
var app = express()

/*seting up template engine */
app.set('view engine','ejs')

/* static files */
app.use(express.static('./public'))

/*firing requests controller */
var requests = require('./controllers/requests')
requests(app);

/*listening to port 3000*/
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("listening to Port "+ PORT)
});