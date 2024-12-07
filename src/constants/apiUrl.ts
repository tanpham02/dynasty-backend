const combineApiUrl = (...urls: string[]) => urls.join('/');

// AUTH
export const AUTH_URL = combineApiUrl('auth');

// CATEGORY
export const BANNERS_URL = combineApiUrl('banners');

// CATEGORY
export const CATEGORY_URL = combineApiUrl('categories');

// PRODUCT
export const PRODUCT_URL = combineApiUrl('products');
export const PRODUCT_ATTRIBUTE_URL = combineApiUrl(`${PRODUCT_URL}`, 'attributes');
export const PRODUCT_VARIANT_URL = combineApiUrl(`${PRODUCT_URL}`, 'variants');
export const PRODUCT_FAVORITE_URL = combineApiUrl(`${PRODUCT_URL}`, 'favorite');

// STORE SYSTEM
export const STORE_SYSTEM_URL = combineApiUrl('store-system');

// COMBO PROMOTIONS
export const COMBO_PROMOTIONS_URL = combineApiUrl('combo-promotions');

//  PROMOTIONS
export const PROMOTIONS_URL = combineApiUrl('promotions');

// VOUCHER
export const VOUCHER_URL = combineApiUrl('vouchers');

// STAFF
export const STAFF_URL = combineApiUrl('staff');

// CUSTOMER
export const CUSTOMER_URL = combineApiUrl('customers');
export const CUSTOMER_ADDRESS_URL = combineApiUrl(`${CUSTOMER_URL}`, 'customer-address');

// CART
export const CART_URL = combineApiUrl('carts');

// ORDER
export const ORDER_URL = combineApiUrl('orders');

// STOCK MANAGEMENTS
export const STOCK_MANAGEMENTS_URL = combineApiUrl('stock-managements');

// INGREDIENT
export const INGREDIENT_URL = combineApiUrl('ingredients');

// MAILER
export const MAILER_URL = combineApiUrl('mailer');

// EMAIL CONFIG
export const EMAIL_CONFIG_URL = combineApiUrl('email-config');

// EMAIL CONFIG
export const EMAIL_TEMPLATE_URL = combineApiUrl('email-template');

// STORE CONFIG
export const STORE_CONFIG_URL = combineApiUrl('store-config');
