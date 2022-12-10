const fs = require('fs');
const http = require('http');
// ------------------------------- Files -------------------------------
// // Blocking, synchronous way
// // reading file
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// // writing to a file
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${new Date().toDateString()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written Successfully...");

// // Non-blocking, asynchronous way
// fs.readFile("./txt/startttt.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 🙂");
//       });
//     });
//   });
// });
// console.log("Will read file!");

// ------------------------------- Server -------------------------------
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  //   res.end("Hello from the server!");
  const pathName = req.url;
  if (pathName === '/product') res.end('This is the PRODUCT');
  else if (pathName === '/overview') res.end('This is the OVERVIEW');
  else if (pathName === '/') res.end('This is HOME');
  else if (pathName === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'hello-world', // own made-up header
    });
    res.end('<h1><strong><em>Page not found!</em></strong></h1>');
  }
});

// I can also write: server.listen(8000, 'localhost', () => {...}) OR server.listen(8000, '127.0.0.1', () => {...})
server.listen(8000, () => {
  console.log('Listening to request on port 8000...');
});
