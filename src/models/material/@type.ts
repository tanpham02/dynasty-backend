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
 *         totalPrice:
 *           type: number
 */

interface MaterialInformation extends Document {
  name?: string;
  price?: number;
  quantity?: string;
}
interface Material extends Document {
  importDate?: string | Date;
  materialInfo?: MaterialInformation[];
  totalPrice?: number;
}

export { Material, MaterialInformation };
