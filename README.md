# (x-forward) Express Forward

This is some express middleware that creates a forward proxy.

## USAGE

``` js
var app = express();
app.use('/db', forward('http://localhost:5984'));
```
Need to only allow access to the proxy based on specific
criteria, just add a middleware before the proxy declaration
for the proxy path.

``` js
var app = express();
app.use('/db', isAuthenticated);
app.use('/db', forward('http://localhost:5984'));

function isAuthenticated(req, res, next) {
  if (!res.session.user) { return res.send(401); }
  next();
}
```

In this example, all requests to /db will be redirected to 
http://localhost:5984

## INSTALL

`npm install x-forward --save`

## FAQ

* Why?

CouchDB Supports CORS, but you still may want to put your CouchDb behind
your firewall, this module allows you to create a proxy to your CouchDb
Server.  Instead of just a full proxy to all of your CouchDb Databases
on the server, it provides you an option to create a regex pattern that
will match against the requested url.  Also, you can pass in your
authentication function and the middleware will perform an
authentication check before enabling your proxy.

## LICENSE

MIT

## SUPPORT

## THANK YOU

* Cloudant for the idea via blog post
* NodeJS
* CouchDB
* Express 
