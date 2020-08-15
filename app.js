//Import some Package 
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');

const app           = express();

var corsOptions = {
    Origin: "http://localhost:3001/"
};

//handler cors
app.use(cors(corsOptions));

//Parse requests of content-type - application/json
app.use(bodyParser.json());

//Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//DataBase 
const db = require('./models');

const Role = db.role;

//Synchonize Database without drop table - in Production
db.sequelize.sync();

 //force: true wiil drop table if it already exists - Development 
/*  db.sequelize.sync({force: true}).then(() =>{
    console.log('Drop and Resync Database with {foce : true ]');
    initial(); 
});  */

//simple route
app.get("/", (req, res) =>{
    res.json({ message: "Welcome to REDUX REACT TODOS APPS"});
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accepet, Autorization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
    }
    next();
})

//Routes 
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/tutorial.routes')(app);
require('./routes/todo.routes')(app);

//set PORT 
const PORT = process.env.PORT || 3000;

//Listen to PORT and display message
app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`);
});

//Initial function to insert data in role table
function initial(){
    Role.create({
        id: 1,
        name:"gestionnaire"
    });

    Role.create({
        id: 2,
        name: "manager"
    });

    Role.create({
        id: 3,
        name: "medecin"
    });

    Role.create({
        id: 4,
        name: "admin"
    });
}
