require('dotenv').config();
require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// // AVH
// app.get('/api/reviews/:productId', (req, res) => {
//   fetch(`http://ec2-54-193-70-8.us-west-1.compute.amazonaws.com/:80/reviews/${req.params.productId}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then(json => res.send(json));
// });

// // AVH
// app.get('/api/helpful/:productId', (req, res) => {
//   fetch(`http://ec2-54-193-70-8.us-west-1.compute.amazonaws.com/:80/helpful/${req.params.productId}`)
//     .then((res) => {
//       // do nothing
//     })
//     .then(json => res.status(202).send());
// });

//Nick
app.get('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/${req.params.productId}`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(json => res.send(json));
});

app.post('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/new`, {
    method: 'POST'
  })
    .then((res) => {
      // do nothing
    })
    .then(json => res.status(202).send());
});

// Matt
// app.get('/api/checkout/:productId', (req, res) => {
//   fetch(`http://ec2-18-224-5-50.us-east-2.compute.amazonaws.com:80/checkout/${req.params.productId}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then(json => res.send(json));
// });

// Chris
app.get('/checkout/:productId', (req, res) => {
  fetch(`http://ec2-18-212-122-128.compute-1.amazonaws.com:7777/checkout/${req.params.productId}`)
    .then(res => res.json())
    .then(json => res.send(json));
});

app.post('/checkout', bodyParser.json(), (req, res) => {
  axios.post('http://ec2-18-212-122-128.compute-1.amazonaws.com:7777/checkout', req.body)
    .then((response) => {
      console.log('Post successful: ', response);
      res.status(201).send('Post successful');
    })
    .catch((error) => {
      console.log('Post Error: ', error);
      res.status(501).send('Post Error');
    });
});

// Sonia
// http://ec2-13-57-246-165.us-west-1.compute.amazonaws.com:3036/?id=1
// app.get('/api/relatedItems', (req, res) => {
//   fetch(`http://ec2-13-57-246-165.us-west-1.compute.amazonaws.com:3036/product?id=${req.query.id}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then(json => res.send(JSON.stringify(json)));
// });

// Lisette
app.get('/product', (req, res) => { //will be sent to my component 
  console.log("here", req.query.id) 
  fetch(`http://ec2-52-53-250-252.us-west-1.compute.amazonaws.com:4043/product/?id=${req.query.id}`) //will proxy to my component server 
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(JSON.stringify(json)));
});

// Michelle
// http://ec2-13-57-32-246.us-west-1.compute.amazonaws.com/?id=2
// app.get('/api/products/', (req, res) => {
//   fetch(`http://ec2-13-57-32-246.us-west-1.compute.amazonaws.com:80/get?id=${req.query.id}`)
//     .then(response => {
//       return response.json()
//     }).then(json => {
//       res.send(json)
//     });
// });

// Roy
app.get('/get', (req, res) => {
  fetch(`http://ec2-54-153-66-98.us-west-1.compute.amazonaws.com:9001/get/?id=${req.query.id}`)
    .then(response => {
      return response.json()
    }).then(json => {
      res.send(json)
    })
    .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`AVH proxy server listening on port ${port}...`);
});
