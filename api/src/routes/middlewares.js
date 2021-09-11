const User = require("../models/user/user")

export async function adminCheck(req, req, next) {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        if (user) {
            if (user.roles.role === "Admin") {
                return next()
            } else {
                return res.status(101).send("[Acceso Denegado]: Requiere permisos de Admin.")
            }
        }
    } else {
        return res.status(101).send("[Acceso Denegado]: No hay usuario logueado.")
    }
}