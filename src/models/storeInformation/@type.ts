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
 *         introduce:
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
 *                email:
 *                   type: string
 *                phoneNumber:
 *                   type: string
 *                taxCode:
 *                   type: string
 *         recruitment:
 *             type: string
 */

interface StoreInformation extends Document {
  introduce?: string;
  brandStore?: string;
  brandLogo?: string;
  representativeOffice?: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    taxCode: string;
  };
  recruitment?: string;
}

export default StoreInformation;
