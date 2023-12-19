import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Material:
 *       type: object
 *       properties:
 *         importDate:
 *           type: string
 *           description: VD 2023-09-15
 *         materialInfo:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                    type: string
 *                 price:
 *                    type: number
 *                 quantity:
 *                    type: string
 *                 unit:
 *                    type: string
 *         totalPrice:
 *           type: number
 */

interface MaterialInformation extends Document {}
interface Material extends Document {
  importDate?: string | Date;
  materialInfo?: Array<{ name?: string; price?: number; quantity?: string; unit?: string }>;
  totalPrice?: number;
}

export { Material, MaterialInformation };
