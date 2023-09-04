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
 *           type: string
 *         city:
 *             type: string
 *         districtId:
 *           type: string
 *         district:
 *             type: string
 *         wardId:
 *           type: string
 *         ward:
 *             type: string
 */

interface ShopSystem extends Document {
  name: string;
  address: string;
  phone: string;
  cityId: string;
  city: string;
  districtId: string;
  district: string;
  wardId: string;
  ward: string;
}

export default ShopSystem;
