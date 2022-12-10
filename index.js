const fs = require('fs');
const http = require('http'); // Core modules
const url = require('url');

const slugify = require('slugify'); // Third party module

const replaceTemplate = require('./modules/replaceTemplate'); // Our own module
// ------------------------------- Server -------------------------------
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const pageNotFound = fs.readFileSync(`${__dirname}/templates/not-found.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// ------------------ "Not a part of code - just using slugify package" -----------------
// const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);
// ------------------------------------------------------------------------------------

const server = http.createServer((req, res) => {
  // console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);

  // Product page
  if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // Overview page
  else if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }
  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);

    // Not Found page
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'hello-world', // own made-up header
    });
    res.end(pageNotFound);
  }
});

// I can also write: server.listen(8000, 'localhost', () => {...}) OR server.listen(8000, '127.0.0.1', () => {...})
server.listen(8000, () => {
  console.log('Listening to request on port 8000...');
});
