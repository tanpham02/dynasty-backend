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

interface ConfigStore extends Document {
  brandStore?: string;
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
  feeShip?: number;
  reasonOrderCancel?: string[];
}

export default ConfigStore;
