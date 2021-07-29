
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/input/:domainip', async (req, res) => {
    console.log(req.params);
    const domainip = req.params.domainip.split(',');
    console.log(domainip);
    const domain = domainip[0];
    const ip = domainip[1];
    console.log(domain,ip);
    const apiKey = 'at_OQBifi7wE5UKnJSsAomiphaW9e9P9';
    const api_url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}&domain=${domain}`;
    const api_response = await fetch(api_url);
    const api_data = await api_response.json();
    console.log(api_data);
    res.json(api_data);
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server started on port 3000");
});

// `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}&domain=${domain}`;