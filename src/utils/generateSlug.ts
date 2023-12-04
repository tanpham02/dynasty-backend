const generateUnsignedSlug = (name: string) => {
  return name
    .split(' ')
    .join('-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default generateUnsignedSlug;
