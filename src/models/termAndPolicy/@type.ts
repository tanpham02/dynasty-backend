import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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

interface TermAndPolicy extends Document {
  deliveryPolicy?: string;
  privatePolicy?: string;
  termAndCondition?: string;
}

export default TermAndPolicy;
