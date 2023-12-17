import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Store Config:
 *       type: object
 *       properties:
 *         feeShip:
 *             type: number
 *         purchasingGuide:
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
 */

interface StoreConfig extends Document {
  feeShip?: number;
  purchasingGuide?: string;
  reasonOrderCancel?: string[];
  hotlineSupport?: {
    order?: string;
    customerCareHotline?: string;
  };
}

export default StoreConfig;
