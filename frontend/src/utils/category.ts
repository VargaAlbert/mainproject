export const ALL_PRODUCTS = "Összes termék";

export const PRODUCT_CATEGORY = [
    "Botok", 
    "Kiegészítők", 
    "Orsók", 
    "Táskák és Camping", 
    "Zsinórok"
];

export const processString = (category: string): string => {
    return category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // eltávolítja az ékezeteket
      .replace(/\s/g, ''); // eltávolítja a szóközöket
};
  

