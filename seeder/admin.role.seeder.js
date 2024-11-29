require("dotenv").config();
const mongoose = require("mongoose");
const counterModel = require("../models/counter.model");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const url = `${MONGO_URI}/${DB_NAME}`;

const connectDataBase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected.");

    const existingRole = await roleModel.findOne({ name: "Admin" });
    let role;

    if (!existingRole) {
      const roleData = {
        roleId: "Role_1",
        name: "Admin",
        permission: [
          {
            module: "Blog",
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          {
            module: "User",
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          {
            module: "ReviewAndComment",
            create: true,
            read: true,
            update: true,
            delete: true,
          },
          {
            module: "Role",
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      role = await new roleModel(roleData).save();
      console.log("Admin role created:", role);

      const roleCounter = {
        _id: "Role",
        seq: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await new counterModel(roleCounter).save();
      console.log("Role counter initialized.");
    } else {
      role = existingRole;
      console.log("Admin role already exists:", role);
    }

    const admin = await userModel.findOne({ email: process.env.ADMIN_EMAIL });

    if (admin) {
      admin.roleId = role.roleId;
      await admin.save();
      console.log("Admin user updated with role:", admin);
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
    console.log("Database connection closed.");
  }
};

connectDataBase();
