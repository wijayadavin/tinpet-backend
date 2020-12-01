require('dotenv').config()
const express = require('express')
const passport = require('passport')
const db = require('./configs/dbConnection')
const bodyParser = require('body-parser')
const app = express()
const defineRelations = require('./models/defineRelations')
const fs = require('fs')
const readDir = require('read-dir-deep');
const path = require('path')
const routesPath = path.resolve('routes')
const filePaths = readDir.readDirDeepSync(routesPath)


// mysql relations:
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
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json())
app.use(passport.initialize());
app.use('/file', express.static('uploads'))

// Solve CORS for any websites:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods',
      'POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

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


// Using the CORS package:
// const cors = require('cors')
// const cookieSession = require('cookie-session')

// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (["http://localhost:3000"].indexOf(req.header("Origin")) !== -1) {
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
  console.log(`${relativeFilePath} loaded!`);
  const route = require(relativeFilePath)
  app.use(route)
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`
  
  ╔═════════════════════════╗
   TinPet API is running in:
     http://localhost:${port}
  ╚═════════════════════════╝
           ＼ʕ•ᴥ•ʔ／`);
})
