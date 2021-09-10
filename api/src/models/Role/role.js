const { Schema , model } = require("mongoose")

const ROLES = ["user","superuser", "admin"];
const RoleSchema = new Schema({
    name: {
        type: String,       
    },
    
}, { timestamps: true, versionKey: false});




module.exports = model("Role", RoleSchema), ROLES;