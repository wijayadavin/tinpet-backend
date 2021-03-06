require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const passport = require('passport')
const db = require('./config/dbConnection')
const bodyParser = require('body-parser')
const app = express()
const defineRelations = require('./models/defineRelations')
const fs = require('fs')
const readDir = require('read-dir-deep');
const path = require('path')
const routesPath = path.resolve('routes')
const filePaths = readDir.readDirDeepSync(routesPath)
const cors = require('cors')

app.use(bodyParser.json())
app.use(passport.initialize());
app.use('/file', express.static('uploads'))


// Solve CORS for any websites:
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   )
//   if (req.method === 'OPTIONS') {
//     res.header('Acess-Control-Allow-Methods',
//       'POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }
//   next()
// })


// Solve folder for uploads:
fs.readdir(path.resolve(), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    if (!files.includes('uploads')) {
      fs.mkdir(path.resolve('uploads'), (err) => 1)
    }
  }
})


app.use(cors())
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if ([
//     "http://localhost:3000",
//     "https://tinder-pet.herokuapp.com"
//   ].indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }
//   } else {
//     corsOptions = { origin: false }
//   }
//   callback(null, corsOptions)
// }
// app.use(cors(corsOptionsDelegate))


// run all routes in routes folder:
filePaths.forEach((filePath) => {
  const relativeFilePath = `./${filePath}`
  // console.log(`${relativeFilePath} loaded!`);
  const route = require(relativeFilePath)
  app.use(route)
})


// Mysql & Server connection:
db
  .authenticate()
  .then(async () => {
    defineRelations();
    await db.sync({ force: false });
    // await Users.findAll({
    //   logging: console.log,
    // })
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Successfully connected to the database!
  _______       ____       __ 
 /_  __(_)___  / __ \\___  / /_
  / / / / __ \\/ /_/ / _ \\/ __/
 / / / / / / / ____/  __/ /_  
/_/ /_/_/ /_/_/    \\___/\\__/  
                                                          
?????????????????????????????????????????????????????????????????????????????????
 TinPet API is running on:
   ${process.env.BASE_URL}:${process.env.PORT}
?????????????????????????????????????????????????????????????????????????????????
         ???????????????????
         `);
    })
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app