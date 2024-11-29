const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    permission: [
      {
        module: {
          type: String,
          trim: true,
        },
        create: {
          type: Boolean,
          default: false,
        },
        read: {
          type: Boolean,
          default: false,
        },
        update: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Role", roleSchema);
