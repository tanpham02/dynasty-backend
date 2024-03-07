import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
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

interface Banner extends Document {
  name?: string;
  priority: number;
  url?: string;
  redirect?: string;

  [key: string]: any;
}

export default Banner;
