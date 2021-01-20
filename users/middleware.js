// const jwt = require("jsonwebtoken");

// const roles = ["student", "basic", "admin"]

// function restrict() { 
//     return async (req, res, next) => {
//         const authError = {
//             Message: "Invalid Credentials",
//         }
//         try {
//             //expression-session will automatically get the session ID from the cookie.
//             // header and check to make sure it's valid and the session for this user exsists.
//             // if (!req.session || !req.session.user) {
//             //     return res.status(401).json({
//             //         Message: "Invalid credentials",
//             //     })
//             // }
//             const token = req.users.password
//             if (!token) {
//                 return res.status(401).json(authError)
//             }

//             jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//                 if (err) {
//                     return res.status(401).json(authError)
//                 }

//                 //allow admins to access "basic" routes, but not the other way around
//                 // if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
//                 //     return res.status(403).json({
//                 //         Message: "You are not authorized to this end point"
//                 //     })
//                 // }
//                 // attach the decoded paylaod to the request so we cana use the data later
//                 req.token = decoded;

//                 // token has been verified
//                 next();
//             })

//         } catch (err) {
//             next(err)
//         }
//     }
// }

// module.exports = {
//     restrict,
// }

function restrict() {
	return async (req, res, next) => {
		try {
			// express-session will automatically get the session ID from the cookie
			// header, and check to make sure it's valid and the session for this user exists.
			if (!req.session || !req.session.users) {
				return res.status(401).json({
					message: "Invalid credentials",
				})
			}

			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}