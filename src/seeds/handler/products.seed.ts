import { CategoryModel, ProductAttributeModel } from '@app/models';

const categories = [
  {
    index: 1,
    name: 'Pizza',
    visible: true,
    priority: 1,
    avatar: '/public/assets/images/category/pizza-category.png',
  },
  {
    index: 2,
    name: 'Mỳ Ý',
    visible: true,
    priority: 2,
    avatar: '/public/assets/images/category/pizza-category.png',
  },
];

const productAttributes = [
  {
    name: 'Kích thước',
    categoryIndex: 1,
    attributeList: [
      {
        label: 'Nhỏ 6”',
      },
      {
        label: 'Vừa 9”',
      },
      {
        label: 'Lớn 12”',
      },
    ],
  },
  {
    name: '1111',
  },
];

const products = [];

export const productsSeeder = async () => {
  // Non-blocking with Macro Task
  setTimeout(async () => {
    await ProductAttributeModel.insertMany(
      productAttributes.filter((item) => !item?.categoryIndex),
    );
  }, 0);

  await Promise.all([
    categories.forEach(async (category) => {
      const newCategory = new CategoryModel(category);
      const filteredProductAttributes = productAttributes
        .filter((it) => it.categoryIndex === category.index)
        ?.map((item) => ({ ...item, categoryId: newCategory._id }));
      await ProductAttributeModel.insertMany(filteredProductAttributes);
      await newCategory.save();
    }),
  ]);
};
