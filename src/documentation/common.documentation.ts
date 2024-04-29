// NOTE: Location Base
/**
 * @swagger
 * components:
 *   schemas:
 *     LocationBase:
 *       type: object
 *       properties:
 *           location:
 *              type: string
 *           cityId:
 *              type: string
 *           city:
 *              type: string
 *           district:
 *              type: string
 *           districtId:
 *              type: string
 *           ward:
 *              type: string
 *           wardId:
 *              type: string
 *           latitude:
 *              type: string
 *           longitude:
 *              type: string
 */

// NOTE: Base Model
/**
 * @swagger
 * components:
 *    schemas:
 *       BaseModel:
 *          type: object
 *          properties:
 *             _id:
 *                type: string
 *             status:
 *                type: string
 *                enum:
 *                   - ACTIVE
 *                   - INACTIVE
 */

// NOTE: Base Search Pagination Parameters
/**
 * @swagger
 * components:
 *   parameters:
 *       PageIndex:
 *            in: query
 *            name: pageIndex
 *            schema:
 *              type: integer
 *              format: int32
 *            default: 0
 *       PageSize:
 *            in: query
 *            name: pageSize
 *            schema:
 *              type: integer
 *              format: int32
 *            default: 10
 *       SortBy:
 *            in: query
 *            name: sortBy
 *            schema:
 *              type: array
 *              items:
 *                 type: string
 *            description: Sort criteria (price:asc, etc.)
 */
