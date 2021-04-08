const express = require('express');
const { connect } = require('./config/mongodb');

const app = express();
const port = 4001;
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(router);
app.use(errorHandler);

connect((connected) => {
  if (connected) {
    console.log(`mongodb movies connected`);

    app.listen(port, () => {
      console.log(`server movies running at port ${port}`);
    })
  } 
  else console.log(`error: mongodb cannot connected`);
})

