import i18next, { init } from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import intervalPlural from "i18next-intervalplural-postprocessor";

i18next
  .use(initReactI18next)
  .use(intervalPlural)
  .use(I18nextBrowserLanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      uk: {
        translation: {
          description: {
            language: "Українська",
          },

          header: {
            navbar: {
              men: { _id: 0, title: "Чоловки", path: "/men", type: "desktop" },
              women: {
                _id: 1,
                title: "Жінки",
                path: "/women",
                type: "desktop",
              },
              kids: {
                _id: 2,
                title: "Діти",
                path: "/animation",
                type: "desktop",
              },
              sale: { _id: 3, title: "Знижки", path: "/", type: "desktop" },
              sport: { _id: 4, title: "Спорт", path: "/", type: "desktop" },
              wishlist: {
                _id: 5,
                title: "Список бажань",
                path: "/wishlist",
                type: "mobile",
              },
              account: { _id: 6, title: "Аккаунт", path: "/", type: "mobile" },
            },
          },
          wishlist: {
            title: " Мій список бажаннь",
            emptyWishlist: "Ваш список бажань пустий",
            emptyWishlistText:
              "Щойно ви додасте щось у свій список бажань – це з’явиться тут.\n" +
              "Готові почати?",
            getStarted: "Розпочати!",
          },
          bag: {
            main: "ВАШ КОШИК",
            size: "Розмір",
            delivery: "Доставка",
            shippingPrice: "Безкоштовна",
            summary: "Загалом",
            total: "Всього",
            items: "Речі",
            clear: "Очистити корзину",
            checkout: "Оплатити",
            emptyBag: "Ваш кошик пустий",
            emptyBagText:
              "Щойно ви додасте щось у свою сумку – це з’явиться тут. Готові почати?",
            getStarted: "Розпочати!",
            key1_interval:
              "(0)[Всього: {{count}} речей];(1)[Всього: {{count}} річ];(2-4)[Всього: {{count}} речі];(5-inf)[Всього: {{count}} речей];",
          },

          userLogModal: {
            settings: {
              account: { link: "#", title: "Мій аккаунт", id: 0 },
              orders: {
                link: "#",
                title: "Мої замовлення",
                id: 1,
                disabled: true,
              },
              sales: { link: "#", title: "Мої знижки", id: 2, disabled: true },
              refund: { link: "#", title: "Повернення", id: 3, disabled: true },
            },
          },

          logInPage: {
            enterEmail: "Введіть емейл:",
            enterPassword: "Введіть пароль:",
            enterName: "Введіть ім'я:",
            enterSurname: "Введіть прізвище:",
            email: "Введіть правильний email",
            required: "Поле є обов'язковим",
            requiredMin: "Пароль повенен містити 8 символів",
            required_plus: "Будь ласка, введіть пароль.",
            required_eng: "Пароль повинен містити тільки англійські літери",
            logIn: "Увійти!",
            logIn_plus: "Або увійти за допомгою...",
            forgotPassword: "Забув пароль =(",
            signUp: "Авторизуватися!",
          },

          addToCart: "Додати в кошик!",
          reviews: "Відгуки",

          signIn: "Увійти",
          search: "Пошук",
          size: "Розмір",
          key1_interval:
            "(0)[{{count}} речей];(1)[{{count}} річ];(2-4)[{{count}} речі];(5-inf)[{{count}} речей];",
        },
      },

      en: {
        translation: {
          description: {
            language: "English",
          },

          header: {
            navbar: {
              men: { _id: 0, title: "Men", path: "/men", type: "desktop" },
              women: {
                _id: 1,
                title: "Women",
                path: "/women",
                type: "desktop",
              },
              kids: {
                _id: 2,
                title: "Kids",
                path: "/animation",
                type: "desktop",
              },
              sale: { _id: 3, title: "Sale", path: "/", type: "desktop" },
              sport: { _id: 4, title: "Sport", path: "/", type: "desktop" },
              wishlist: {
                _id: 5,
                title: "Wishlist",
                path: "/wishlist",
                type: "mobile",
              },
              account: { _id: 6, title: "Account", path: "/", type: "mobile" },
            },
          },

          logInPage: {
            enterEmail: "Enter your email:",
            enterPassword: "Enter your password:",
            enterName: "Enter your name:",
            enterSurname: "Enter your surname:",
            email: "Enter a valid email",
            required: "The field is required",
            requiredMin: "Password must contain 8 characters",
            required_plus: "Please , enter a password.",
            required_eng: "The password must contain only English letters",
            logIn: "Log In!",
            logIn_plus: "Log in with...",
            forgotPassword: "I forgot my password =(",
            signUp: "Sign Up!",
          },

          wishlist: {
            title: "My wishlist",
            emptyWishlist: "Your wishlist is empty",
            emptyWishlistText:
              "As soon as you add something to your wishlist, it will appear here.\n" +
              "Ready to start?",
            getStarted: "Get started!",
          },

          signPage: {
            email: "",
          },

          bag: {
            main: "YOUR BAG",
            size: "Size",
            delivery: "Delivery",
            shippingPrice: "Free",
            summary: "Summary",
            total: "Total",
            items: "Items",
            clear: "Clear the bag",
            checkout: "Checkout",

            emptyBag: "Your bag is empty",
            emptyBagText:
              "As soon as you add something to your bag, it will appear here. Ready to start?",
            getStarted: "Get started!",
            key1_interval:
              "Total: (0)[{{count}} items];(1)[Total: {{count}} item];(2-inf)[Total: {{count}} items];",
          },

          userLogModal: {
            settings: {
              account: { link: "#", title: "My account", id: 0 },
              orders: { link: "#", title: "My orders", id: 1, disabled: true },
              sales: {
                link: "#",
                title: "My discounts",
                id: 2,
                disabled: true,
              },
              refund: { link: "#", title: "Return", id: 3, disabled: true },
            },
          },

          addToCart: "Add to cart!",
          reviews: "Reviews",
          signIn: "Sign In",

          search: "Search",
          size: "Size",
          key1_interval:
            "(0)[{{count}} items];(1)[{{count}} item];(2-inf)[{{count}} items];",
        },
      },
    },

    /*  debug: true,*/

    /*    react: {
      transSupportBasicHtmlNodes: false,
    },*/

    // have a common namespace used around the full app
    /*    ns: ["translations"],
    defaultNS: "translations",*/

    /*keySeparator: false, // we use content as keys*/

    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
  });
