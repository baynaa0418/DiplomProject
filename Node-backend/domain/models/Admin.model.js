import { Schema } from "mongoose";

import User from "./User.model.js";

const AdminSchema = new Schema({
});

//Mongoose's discriminator feature allows you to create specialized models that inherit from a base model.
const Admin = User.discriminator("Admin", AdminSchema);

export default Admin;
