import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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

interface StoreInformation extends Document {
  brandStore?: string;
  brandLogo?: string;
  representativeOffice?: {
    name: string;
    address: string;
    phoneNumber: string;
    taxCode: string;
  };
  recruitment?: string;
}

export default StoreInformation;
