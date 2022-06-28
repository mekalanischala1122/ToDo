var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})
var mongoose = require('mongoose')

  /*Connecting to Database*/
mongoose.connect("mongodb+srv://test:test123@todo.xlooxdr.mongodb.net/test")

//var data = [{item: 'take contest'}, {item: 'revise basics'}, {item: 'go for a walk'}]

/*Creating a Schema-(the blueprint of our database)*/
var todoSchema = new mongoose.Schema({
    item: String
})

/*creating the model*/
var Todo = mongoose.model('Todo',todoSchema)

/* var itemOne = Todo({item: 'prepare cv'}).save((err)=>{
    if(err) throw err
    console.log('item saved')
 }) 
*/

module.exports = function(app){

   app.get('/todo',(req,res)=>{
        /*geting data from out database and passing it to view */
        Todo.find({},(err,data)=>{
            if(err) throw err;
            res.render('todo',{todos: data})
        })
   }) 

   app.post('/todo',urlencodedParser,(req,res)=>{
        /*adding the new data from view to our database */
        var newTodo = Todo(req.body).save((err,data)=>{
            if(err) throw err
            res.json(data)
        })
    })
    
   app.delete('/todo/:item',(req,res)=>{
    /*deleting the requested item fom our database*/
      Todo.find({item: req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
        if(err) throw err
        res.json(data)
      })
      /* data = data.filter((todo)=>{
        return todo.item.replace(/ /g,'-') !== req.params.item
       })
       res.json(data)
       */
   })  
}