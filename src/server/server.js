import express from 'express'
const app = express()
const route = express.Router();
const port = 5000

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use("/v1", route);
app.listen(port, () => {
    console.log(`Listening on port ${port} here we go!`);
})


