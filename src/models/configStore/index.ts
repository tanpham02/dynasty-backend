import { Schema, model } from 'mongoose';
import ConfigStore from './@type';
/**
 * @swagger
 * components:
 *   schema:
 *     ConfigStore:
 *       type: object
 *       properties:
 *         brandStore:
 *             type: string
 *         deliveryPolicy:
 *             type: string
 *         privatePolicy:
 *             type: string
 *         termAndCondition:
 *             type: string
 *         feeShip:
 *             type: string
 *         reasonOrderCancel:
 *             type: array
 *             items:
 *               type: string
 */

const ConfigStoreSchema = new Schema<ConfigStore>(
  {
    brandStore: {
      type: String,
    },
    deliveryPolicy: {
      type: String,
    },
    privatePolicy: {
      type: String,
    },
    termAndCondition: {
      type: String,
    },
    feeShip: {
      type: Number,
    },
    reasonOrderCancel: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false },
);

const ConfigStoreModel = model('ConfigStore', ConfigStoreSchema);

export default ConfigStoreModel;
