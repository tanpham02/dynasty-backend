import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Store System:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         phone:
 *             type: string
 *         cityId:
 *           type: number
 *         city:
 *             type: string
 *         districtId:
 *           type: number
 *         district:
 *             type: string
 *         wardId:
 *           type: number
 *         ward:
 *             type: string
 */

interface StoreSystem extends Document {
  name: string;
  location: string;
  phone: string;
  cityId: number;
  city: string;
  districtId: number;
  district: string;
  wardId: number;
  ward: string;
}

export default StoreSystem;
