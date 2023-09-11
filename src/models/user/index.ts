import { Schema, model } from 'mongoose';
import User, { Role } from './@type';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *         birthday:
 *           type: string
 *         fullName:
 *             type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 */

const UserSchema = new Schema<User>(
  {
    userName: {
      type: String,
      require: true,
      min: 4,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
    },
  },
  { timestamps: true, versionKey: false },
);

const UserModel = model('User', UserSchema);

export default UserModel;
