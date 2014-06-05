var http = require ('http');
var path = require ('path');
var fs   = require ('fs');
var ck   = require ('cookies');
var qs   = require ('querystring');

var svr = http.createServer (function (req, res) {
        if (req.method == 'GET') return handleGet (req, res);
        if (req.method == 'POST') return handlePost (req, res);
        return handleError (res, 500, "Method not handled: " + req.method);
        });

svr.listen (8080);

function handleError (res, status, err) {
    console.error (err);
    res.writeHead (status);
    res.end ();
}

function userNeedsLogin (cookies) {
    if (cookies['username'] && cookies['ext']) return false;
    return true;
}

var DEFAULT_PAGE = "index.html";
var LOGIN_PAGE = "login.html";
var DOC_ROOT = "www";

function handleGet (req, res) {

    var filepath = req.url;
    var cookies  = ck.getCookies (req);

    if (userNeedsLogin (cookies)) filepath = LOGIN_PAGE;
    else if (filepath === '/') filepath = DEFAULT_PAGE;

    filepath = path.join (DOC_ROOT, path.join ('/', filepath));

    var stream = fs.createReadStream (filepath);
    stream.on ('error', function (err) { return handleError (res, 404, err); });
    stream.pipe (res);
}

function handlePost (req, res) {
    if (req.url === '/ordermenu') return getOrderMenu (req, res);
    if (req.url === '/login') return handleLogin (req, res);
    return handleError (res, 400, "Post not handled: " + req.url);
}

function getOrderMenu (req, res) {

    var orders = [
        { name: 'Coffee', img: 'img/coffee.png' },
        { name: 'Tea', img: 'img/tea.png' },
        { name: 'Biscuits', img: 'img/biscuits.png' },
    ];

    res.writeHead (200, { 'Content-Type' : 'application/json' });
    res.end (JSON.stringify (orders));
}

function handleLogin (req, res) {
    var postdata = '';
    req.on ('data', function (d) { postdata += d; });
    req.on ('end', function () {
                postdata = qs.parse (postdata);
                ck.setCookies (res, postdata);
                res.writeHead (302, { 'Location': '/' } );
                res.end ();
            });
}
