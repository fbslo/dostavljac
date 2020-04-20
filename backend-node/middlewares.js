const jwt = require('jsonwebtoken');

module.exports = {
    authenticateRoute: function authenticateRoute(req, res, next) {
        var token = req.cookies["id"];
        var sign = process.env.JWT_SECRET;

        jwt.verify(token, sign, function (err, decoded) {
          console.log(decoded)
            if (err || !decoded) {
                console.log("invalid token");
                res.send(403);
            }
            else if (decoded && (!decoded.access || decoded.access == "unauthenticated")) {
                console.log("unauthenticated token");
                res.send(403);
            }
            else if (decoded && decoded.access == "authenticated") {
                console.log("valid token")
                next();
            }
            else {
                console.log("something suspicious")
                res.send(403);
            }
        });
    }
}
