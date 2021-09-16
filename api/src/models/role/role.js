const { Schema , model } = require("mongoose")


const RoleSchema = new Schema({
    name: {
        type: String,     
    },
    
}, { timestamps: true, versionKey: false});




module.exports = model("Role", RoleSchema);