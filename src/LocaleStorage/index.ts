export enum LocalStorageKey {
  SHOES = "shoes",
  CART = "cart",
  PRICE = "price",
  WISHLIST = "wishlist",
}

export type MultipleParams = {
  key: LocalStorageKey;
  needParse?: boolean;
};

class LocaleStorage {
  multipleGetItems(items: MultipleParams[]): Record<any, any> {
    try {
      return items.map(({ key, needParse }) => ({
        [key]: this.getItem(key, needParse),
      }));
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  getItem(key: LocalStorageKey, needParse: boolean = true): any {
    try {
      const result = localStorage.getItem(key);

      if (!result) {
        return;
      }

      return needParse ? JSON.parse(result) : result;
    } catch (err) {
      console.error(err);
    }
  }

  setItem(key: LocalStorageKey): any {
    try {
      const result = localStorage.setItem(`${key}`, JSON.stringify(key));
    } catch (err) {
      console.error(err);
    }
  }
}
export const storage = new LocaleStorage();
