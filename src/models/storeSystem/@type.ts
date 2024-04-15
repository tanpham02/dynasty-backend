import { LocationBaseModel } from '@app/types';
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
 *         latitude:
 *           type: string
 *         longitude:
 *             type: string
 */

interface StoreSystem extends Document, LocationBaseModel {
  name: string;
  phone: string;
}

export default StoreSystem;
