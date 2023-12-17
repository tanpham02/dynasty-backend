import Banner from './@type';
import { Schema, model } from 'mongoose';

// SCHEMAS RESPONSE

/**
 * @swagger
 * components:
 *   schema:
 *     Banners:
 *       type: object
 *       properties:
 *         name:
 *             type: string
 *         priority:
 *             type: number
 *         banner:
 *             type: string
 *         redirect:
 *             type: string
 */

const BannerSchema = new Schema<Banner>(
  {
    name: {
      type: String,
    },
    priority: {
      type: Number,
    },
    banner: {
      type: String,
    },
    redirect: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const BannerMainModel = model('Banner', BannerSchema);

export default BannerMainModel;
