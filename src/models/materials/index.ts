import { Material } from './@type';
import { Schema, model } from 'mongoose';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
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

const MaterialSchema = new Schema<Material>(
  {
    importDate: {
      type: Date,
    },
    materialInfo: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false },
);

const MaterialMode = model('Material', MaterialSchema);

export default MaterialMode;
