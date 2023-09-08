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
 */

interface ConfigStore extends Document {
  brandStore?: string;
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
}

export default ConfigStore;
