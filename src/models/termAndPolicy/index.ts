// SCHEMAS RESPONSE

import { Schema, model } from 'mongoose';
import TermAndPolicy from './@type';

/**
 * @swagger
 * components:
 *   schema:
 *     Term And Policy:
 *       type: object
 *       properties:
 *         deliveryPolicy:
 *           type: string
 *         privatePolicy:
 *           type: string
 *         termAndCondition:
 *             type: string
 */

const TermAndPolicySchema = new Schema<TermAndPolicy>(
  {
    deliveryPolicy: {
      type: String,
    },
    privatePolicy: {
      type: String,
    },
    termAndCondition: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const TermAndPolicyModel = model('TermAndPolicy', TermAndPolicySchema);

export default TermAndPolicyModel;
