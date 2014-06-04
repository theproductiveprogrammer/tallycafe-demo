var http = require ('http');
var path = require ('path');
var fs   = require ('fs');

var svr = http.createServer (function (req, res) {
        if (req.method == 'GET') return handleGet (req, res);
        return handleError (res, 500, "Method not handled: " + req.method);
        });

svr.listen (8080);

function handleError (res, status, err) {
    console.error (err);
    res.writeHead (status);
    res.end ();
}

var DEFAULT_PAGE = "index.html";
var DOC_ROOT = "www";

function handleGet (req, res) {
    var filepath = req.url;

    if (filepath === '/') filepath = DEFAULT_PAGE;

    filepath = path.join (DOC_ROOT, path.join ('/', filepath));

    var stream = fs.createReadStream (filepath);
    stream.on ('error', function (err) { return handleError (res, 404, err); });
    stream.pipe (res);
}


