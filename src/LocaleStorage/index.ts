export enum LocalStorageKey {
  CART = "cart",
  SHOES = "shoes",
  USERS = "users",
  PRICE = "price",
  WISHLIST = "wishlist",
  ACTIVE_USER = "active_user",
  AUTH = "auth",
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

  setItem(key: LocalStorageKey, value: any): any {
    try {
      const result = localStorage.setItem(`${key}`, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }
}
export const storage = new LocaleStorage();
