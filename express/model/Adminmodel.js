import Mongoose from "mongoose";

const adminSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true });

const Admin = Mongoose.model("Admin", adminSchema);
export default Admin;
