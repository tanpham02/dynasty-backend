// NOTE: Store System
/**
 * @swagger
 * components:
 *   schemas:
 *      StoreSystem:
 *         allOf:
 *            - $ref: '#/components/schemas/BaseModel'
 *            - $ref: '#/components/schemas/LocationBase'
 *         type: object
 *         required:
 *            - name
 *            - phoneNumber
 *            - cityId
 *            - city
 *            - district
 *            - districtId
 *            - ward
 *            - wardId
 *            - latitude
 *            - longitude
 *            - location
 *         properties:
 *            name:
 *                type: string
 *            phoneNumber:
 *                type: string
 */
