import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     ConfigStore:
 *       type: object
 *       properties:
 *         brandStore:
 *             type: string
 *         memberPolicies:
 *             type: string
 *         deliveryPolicy:
 *             type: string
 *         privatePolicy:
 *             type: string
 *         termAndCondition:
 *             type: string
 *         feeShip:
 *             type: number
 *         recruitment:
 *             type: string
 *         howIsOrder:
 *             type: string
 *         reasonOrderCancel:
 *             type: array
 *             items:
 *               type: string
 *         hotlineSupport:
 *             type: object
 *             properties:
 *                order:
 *                   type: string
 *                customerCareHotline:
 *                   type: string
 *         representOffice:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                address:
 *                   type: string
 *                phoneNumber:
 *                   type: string
 *         linkWithUs:
 *             type: object
 *             properties:
 *                facebook:
 *                   type: string
 *                instagram:
 *                   type: string
 */

interface ConfigStore extends Document {
  recruitment?: string;
  brandStore?: string;
  memberPolicies?: string;
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
  feeShip?: number;
  reasonOrderCancel?: string[];
  hotlineSupport?: {
    order?: string;
    customerCareHotline?: string;
  };
  howIsOrder?: string;
  representOffice?: {
    name: string;
    address: string;
    phoneNumber: string;
  };
  linkWithUs: {
    facebook: string
    instagram: string
  }
}

export default ConfigStore;
