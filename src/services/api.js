import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

export const fetchProducts = async (page = 1) => {
  const res = await axios.get(`${BASE_URL}/api/v2/search`, {
    params: {
      page,
      page_size: 20,
      fields:
        "code,product_name,image_url,categories,ingredients_text,nutrition_grades",
    },
  });
  return res.data.products;
};

export const searchProducts = async (query, page = 1) => {
  const res = await axios.get(`${BASE_URL}/api/v2/search`, {
    params: {
      search_terms: query,
      search_simple: 1,
      action: "process",
      page,
      page_size: 20,
      fields:
        "code,product_name,image_url,categories,ingredients_text,nutrition_grades",
    },
  });
  return res.data.products;
};

export const getProductByBarcode = async (barcode) => {
  const res = await axios.get(
    `${BASE_URL}/api/v0/product/${barcode}.json`
  );
  return res.data.product;
};


export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories.json`);
  return res.data.tags;
};
