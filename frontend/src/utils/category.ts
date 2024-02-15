export const PRODUCT_CATEGORY = [
    "Összes termék", 
    "Botok", 
    "Kiegészítők", 
    "Orsók", 
    "Táskák és Camping", 
    "Zsinórok"
]

export const processString = (category: string): string => {
    return category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // eltávolítja az ékezeteket
      .replace(/\s/g, ''); // eltávolítja a szóközöket
  };
  

