const express = require('express')
const app = express()
const port = 4000

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Entertainme run at port ${port}`)
})