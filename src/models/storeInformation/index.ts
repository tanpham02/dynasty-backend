import { model } from 'mongoose';
// SCHEMAS RESPONSE

import { Schema } from 'mongoose';
import StoreInformation from './@type';

/**
 * @swagger
 * components:
 *   schema:
 *     Store Information:
 *       type: object
 *       properties:
 *         brandStore:
 *             type: string
 *         brandLogo:
 *             type: string
 *         representativeOffice:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                address:
 *                   type: string
 *                phoneNumber:
 *                   type: string
 *                taxCode:
 *                   type: string
 *         recruitment:
 *             type: string
 */

const StoreInformationSchema = new Schema<StoreInformation>(
  {
    brandStore: {
      type: String,
    },
    brandLogo: {
      type: String,
    },
    representativeOffice: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      taxCode: {
        type: String,
      },
    },
    recruitment: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const StoreInformationModel = model('StoreInformation', StoreInformationSchema);

export default StoreInformationModel;
