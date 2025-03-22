import products from '../db/productsData';

const productService = {
  getAllProducts() {
    return products;
  },
};

export { productService };
