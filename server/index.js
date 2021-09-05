require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const { v4 } = require('uuid')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const spotifyAuthCtrl = require('./controllers/spotifyAuthController')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(
  session({
    genid: v4,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

app.use(express.static(`${__dirname}/../build`))

//*SPOTIFY LOGIN ENDPOINTS
app.get('/login', spotifyAuthCtrl.login)
app.post('/callback', spotifyAuthCtrl.callback)
app.post('/refresh', spotifyAuthCtrl.refresh)
app.get('/session', spotifyAuthCtrl.sessionCheck)
app.post('/token', spotifyAuthCtrl.checkLocalToken)

//! ALL ENDPOINTS ABOVE THIS LINE!!!!!
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
