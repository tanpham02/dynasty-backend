import { Document } from 'mongoose';

// SCHEMAS DESCRIPTION

/**
 * @swagger
 * components:
 *   schemas:
 *     Shop System:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *         - cityId
 *         - city
 *         - districtId
 *         - district
 *         - wardId
 *         - ward
 *       properties:
 *         name:
 *           type: string
 *         address:
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

interface ShopSystem extends Document {
  name: string;
  address: string;
  phone: string;
  cityId: number;
  city: string;
  districtId: number;
  district: string;
  wardId: number;
  ward: string;
}

export default ShopSystem;
