const initial_route = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1 style=text-align:center>Welcome to Practce Project 2023</h1>");
}



module.exports = initial_route