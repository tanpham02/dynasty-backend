import { CategoryModel, ProductAttributeModel } from '@app/models';

const categories = [
  {
    index: 1,
    name: 'Pizza',
    visible: true,
    priority: 1,
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
    name: 'Đế',
    categoryIndex: 1,
    attributeList: [
      {
        label: 'Mỏng giòn',
      },
      {
        label: 'Dày',
      },
    ],
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
