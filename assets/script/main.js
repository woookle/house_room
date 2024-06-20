// Константы для облегчения работы
const logo = document.querySelector(".logo");
const main = document.querySelector("main");
const body = document.querySelector("body");
const nav_links = document.querySelectorAll(".nav li a");
const logo_link = document.querySelector(".logo");
const change_theme_btn = document.querySelector(".change_theme_btn");
const burger = document.querySelector(".burger");
const login_register = document.querySelector(".login_register");
const name_account = document.querySelector(".name_account");
const popup_block = document.querySelector(".popup_block");
const register_block = document.querySelector(".register_block");
const account_and_settings = document.querySelector(".account_and_settings");
const account_settings = document.querySelector(".account_settings");
const change_theme_block = document.querySelector(".change_theme_block");
const logout_account = document.querySelector(".logout_account");
const account_changes = document.querySelector(".account_changes");
const add_account_money = document.querySelector(".account_sum");
const change_account_name = document.querySelector(".change_account_name");
const change_account_email = document.querySelector(".change_account_email");
const change_account_password = document.querySelector(
  ".change_account_password"
);
const account_sum = document.querySelector(".account_sum");
const information_block = document.querySelector(".information");
const show_card_block = document.querySelector(".show_card_block");

// Бургер меню
burger.addEventListener("click", () => {
  body.classList.toggle("active_burger");
  account_settings.classList.remove("settings_burger_active");
  change_theme_block.classList.remove("change_theme_burger_active");
});

// Функция показа информации
const showInfo = (text) => {
  if (information_block.innerHTML == "") {
    information_block.innerHTML += `<div><h3>${text}!</h3></div>`;
    const info = document.querySelector(`.information div`);
    setTimeout(() => {
      info.classList.add("hide_info");
    }, 2500);
    setTimeout(() => {
      info.remove();
    }, 3000);
  }
};

// База карточек
let cards = [
  {
    id: 1,
    image: "assets/images/HomeCards/1.jpg",
    category: "Дом на одну семью",
    price: "1 654 000",
    size: 120,
    bedrooms: 2,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 2,
    image: "assets/images/HomeCards/2.jpg",
    category: "Дом на одну семью",
    price: "3 500 000",
    size: 140,
    bedrooms: 5,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 3,
    image: "assets/images/HomeCards/3.jpg",
    category: "Дом на одну семью",
    price: "4 404 900",
    size: 171,
    bedrooms: 5,
    baths: 2,
    city: "Москва",
  },
  {
    id: 4,
    image: "assets/images/HomeCards/4.jpeg",
    category: "Дом на одну семью",
    price: "2 430 000",
    size: 108,
    bedrooms: 2,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 5,
    image: "assets/images/HomeCards/5.jpg",
    category: "Дом на одну семью",
    price: "2 468 000",
    size: 102,
    bedrooms: 4,
    baths: 2,
    city: "Казань",
  },
  {
    id: 6,
    image: "assets/images/HomeCards/6.jpg",
    category: "Дом на одну семью",
    price: "2 586 000",
    size: 101,
    bedrooms: 4,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 7,
    image: "assets/images/HomeCards/7.jpg",
    category: "Дом на одну семью",
    price: "1 654 000",
    size: 120,
    bedrooms: 2,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 8,
    image: "assets/images/HomeCards/8.jpg",
    category: "Дом на одну семью",
    price: "2 393 000",
    size: 108,
    bedrooms: 5,
    baths: 2,
    city: "Казань",
  },
  {
    id: 9,
    image: "assets/images/HomeCards/9.jpg",
    category: "Дом на одну семью",
    price: "3 500 000",
    size: 140,
    bedrooms: 5,
    baths: 2,
    city: "Альметьевск",
  },
  {
    id: 10,
    image: "assets/images/HomeCards/10.jpg",
    category: "Дом на одну семью",
    price: "2 588 000",
    size: 110,
    bedrooms: 6,
    baths: 2,
    city: "Москва",
  },
];

// База вошедшего аккаунта
let AuthMe = {
  id: null,
  name: null,
  email: null,
  password: null,
  money: null,
  korzina: [],
  isAuth: false,
};

// База аккаунтов
let accounts = [
  {
    id: 4,
    name: "admin",
    email: "admin",
    password: "admin",
    money: "1 000 000 000",
    korzina: [],
  },
];

// База отзывов
let reviews = [];

// Проверка аккаунта
const checkIsAuth = () => {
  if (AuthMe.isAuth) {
    login_register.classList.add("hide");
    name_account.innerHTML = AuthMe.name;
    name_account.classList.remove("hide");
    account_and_settings.classList.add("active");
  } else {
    login_register.classList.remove("hide");
    name_account.classList.add("hide");
    account_and_settings.classList.remove("active");
  }
};

// Выход из аккаунта
const logoutAccout = () => {
  AuthMe.id =
    AuthMe.name =
    AuthMe.email =
    AuthMe.password =
    AuthMe.money =
      null;
  AuthMe.isAuth = false;
  checkIsAuth();
};

// Popup блок пополнения счета
const top_up_money_pop = `<form class="top_up_money_form">
      <div class="top_up_money_block" >
        <h1>Пополнить счет</h1>
        <input type="number" id="money" placeholder="Введите сумму пополнения" />
        <input type="password" id="auth_password" placeholder="Введите пароль" />
        <p class="top_up_money_error"></p>
        <div class="change_account_name_btns">
          <button type="button" class="top_up_money_btn">Пополнить</button>
          <button type="button" class="cancel_top_up_money_btn">Отмена</button>
        </div>
      </div>
    </form>`;

// Пополнение счета аккаунта
const addMoney = (sum) => {
  let old_money = AuthMe.money.replace(/\s+/g, "");
  let added = Number(old_money) + Number(sum);
  let result = String(added).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  AuthMe.money = result;
  for (el of accounts) {
    if (el.id == AuthMe.id) {
      el.money = AuthMe.money;
      break;
    }
  }
};

// Деньги аккаунта
const checkMoney = (set) => {
  if (!set) {
    if (AuthMe.isAuth) {
      account_sum.innerHTML = `Ваш счет: ${AuthMe.money} ₽`;
    } else {
      account_sum.innerHTML = "Ваш счет: 0 ₽";
    }
  } else if (set == "+") {
    account_changes.innerHTML = null;
    account_changes.innerHTML += top_up_money_pop;

    const main_money_form = document.querySelector(".top_up_money_form");

    const money = document.getElementById("money");
    const auth_password = document.getElementById("auth_password");

    const top_up_money_error = document.querySelector(".top_up_money_error");

    const top_up_money_btn = document.querySelector(".top_up_money_btn");
    const cancel_top_up_money_btn = document.querySelector(
      ".cancel_top_up_money_btn"
    );

    top_up_money_btn.addEventListener("click", () => {
      if (money.value.trim() == "") {
        top_up_money_error.innerHTML = "Введите корректную сумму пополнения";
      } else if (
        Number(money.value.trim()) < 500000 ||
        Number(money.value.trim()) > 15000000
      ) {
        top_up_money_error.innerHTML =
          "Сумма пополнения 500 000 ₽ - 15 000 000 ₽";
      } else if (auth_password.value != AuthMe.password) {
        top_up_money_error.innerHTML = "Пароли не совпадают";
      } else {
        addMoney(money.value);
        checkMoney();
        showInfo("Кошелек успешно пополнен");
        main_money_form.classList.add("hide_pop");
        setTimeout(() => {
          main_money_form.remove();
        }, 500);
      }
    });

    cancel_top_up_money_btn.addEventListener("click", () => {
      main_money_form.classList.add("hide_pop");
      setTimeout(() => {
        main_money_form.remove();
      }, 500);
    });
  }
};

// Изменить имя аккаунта
const change_name = (new_name) => {
  for (el of reviews) {
    if (el.user_id == AuthMe.id) {
      el.name = new_name;
    }
  }
  if (nav_links[3].classList.contains("active_nav_link")) {
    AddReview();
  }
  for (el of accounts) {
    if (el.email === AuthMe.email) {
      el.name = new_name;
      break;
    }
  }
  AuthMe.name = new_name;
  checkIsAuth();
};

// Изменить email аккаунта
const change_email = (new_email) => {
  for (el of accounts) {
    if (el.email == AuthMe.email) {
      el.email = new_email;
      break;
    }
  }
  AuthMe.email = new_email;
};

// Изменить пароль аккаунта
const change_password = (new_password) => {
  for (el of accounts) {
    if (el.email == AuthMe.email) {
      el.password = new_password;
      break;
    }
  }
  AuthMe.password = new_password;
};

// Регистрация аккаунта
const registerAccount = (username, email, password) => {
  for (el of accounts) {
    if (el.email == email) {
      return true;
    }
  }
  accounts.push({
    id: accounts.length + 1,
    name: username,
    email: email,
    password: password,
    money: "0",
    korzina: [],
  });
};

// Проверка аккаунта на валидность
const CheckAccount = (email, password) => {
  for (el of accounts) {
    if (el.email === email && el.password === password) {
      AuthMe.id = el.id;
      AuthMe.name = el.name;
      AuthMe.email = el.email;
      AuthMe.password = el.password;
      AuthMe.money = el.money;
      AuthMe.korzina = el.korzina;
      AuthMe.isAuth = true;
      checkMoney();
      checkIsAuth();
      return true;
    }
  }
  return false;
};

// Заполнение карточек
const AddAdsCard = () => {
  const cardsBlock = document.querySelector(".cards_container");
  cardsBlock.innerHTML = null;
  if (cards.length != 0) {
    cards.map((el) => {
      cardsBlock.innerHTML += `<div class="card" id=${el.id}>
                <div class="card_image"><img src="${el.image}" alt="home"></div>
                <p class="card_category">${el.category}</p>
                <p class="card_price">${el.price} ₽</p>
                <div class="card_desc">
                  <p class="card_size">${el.size} м²</p>
                  <div class="card_circle"></div>
                  <p class="card_bedrooms">${el.bedrooms} спальни</p>
                  <div class="card_circle"></div>
                  <p class="card_baths">${el.baths} ванны</p>
                </div>
                <p class="card_city">${el.city}</p>
              </div>`;
    });
    const home_list = document.querySelectorAll(".card");
    home_list.forEach((el) => {
      el.addEventListener("click", () => {
        showCard(el.id);
      });
    });
  } else {
    cardsBlock.innerHTML += "<p>Объявлений нет!</p>";
  }
};

// Добавление товара в корзину
const AddToKorzina = (elem) => {
  for (k of AuthMe.korzina) {
    if (k.id == elem.id) {
      return true;
    }
  }
  AuthMe.korzina.push({
    id: elem.id,
    image: elem.image,
    category: elem.category,
    price: elem.price,
    size: elem.size,
    bedrooms: elem.bedrooms,
    baths: elem.baths,
    city: elem.city,
  });
  for (el of accounts) {
    if (el.id == AuthMe.id) {
      el.korzina = AuthMe.korzina;
      break;
    }
  }
};

// Узнать общую сумму корзины
const getTotalMoneyKorzina = () => {
  const total_money_info = document.querySelector(".total_money_info");
  let total_money = 0;
  AuthMe.korzina.forEach((el) => {
    total_money += Number(el.price.replace(/\s+/g, ""));
  });
  total_money_info.innerHTML = `К оплате: ${String(total_money).replace(
    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
    "$1 "
  )} ₽`;
};

// Заполнение корзины
const AddKorzina = () => {
  const your_homes = document.querySelector(".your_homes");
  your_homes.innerHTML = null;
  if (AuthMe.korzina.length == 0) {
    your_homes.innerHTML = `<p>Корзина пуста!</p>`;
  } else {
    AuthMe.korzina.forEach((el) => {
      your_homes.innerHTML += `<div class="home_korzina">
                <div class="korzina_image_title">
                  <img src="${el.image}" alt="home" id="${el.id}" />
                  <div>
                    <p>${el.category}</p>
                    <p class="korzina_price">${el.price} ₽</p>
                  </div>
                </div>
                <button type="button" class="remove_home_korzina" id=${el.id}>Удалить</button>
              </div>`;
    });
  }
  const remove_home_btns = document.querySelectorAll(".remove_home_korzina");
  const cards_korzina = document.querySelectorAll(
    ".home_korzina .korzina_image_title img"
  );
  cards_korzina.forEach((el) => {
    el.addEventListener("click", () => {
      showCardInKorzina(el.id);
    });
  });
  remove_home_btns.forEach((el) => {
    el.addEventListener("click", () => {
      RemoveToKorzina(el.id);
      getTotalMoneyKorzina();
    });
  });
};

// Удаление товара из корзины
const RemoveToKorzina = (id) => {
  for (el of AuthMe.korzina) {
    if (el.id == id) {
      cards.push(el);
      for (elem of accounts) {
        if (elem.id == AuthMe.id) {
          elem.korzina = elem.korzina.filter((e) => e.id != el.id);
        }
      }
      AuthMe.korzina = AuthMe.korzina.filter((e) => e.id != el.id);
    }
  }
  AddKorzina();
};

// Popup блок изменения отзыва
const change_review_pop = `<form class="change_review_form">
      <div class="change_review_block" >
        <h1>Изменить отзыв</h1>
        <input type="text" id="new_review" placeholder="Введите новый отзыв" />
        <div class="change_account_name_btns">
          <button type="button" class="save_new_review">Изменить</button>
          <button type="button" class="cancel_new_review">Отмена</button>
        </div>
      </div>
    </form>`;

// Заполнение отзывов
const AddReview = () => {
  const reviews_clients = document.querySelector(".reviews_clients");
  reviews_clients.innerHTML = null;
  if (reviews.length == 0) {
    reviews_clients.innerHTML += `<p>Отзывов нет!</p>`;
  } else {
    reviews.map((el) => {
      reviews_clients.innerHTML += `<div class="review">
                <div>
                  <p class="review_name">${el.name}</p>
                  <p class="review_desc">${el.description}</p>
                </div>
                ${
                  el.user_id == AuthMe.id || AuthMe.id == 4
                    ? `<div class="comment_block" >
                                                <img src="assets/images/OtherImages/dark_dots.svg" alt="settings">
                                                <img src="assets/images/OtherImages/white_dots.svg" alt="settings" class="dark_dots_settings">
                                                <div class="comment_settings_block" >
                                                  <button type="button" class="change_comment_btn" id="${el.rev_id}">Изменить</button>
                                                  <button type="button" class="remove_comment_btn" id="${el.rev_id}">Удалить</button>
                                                </div>
                                              </div>`
                    : ""
                }
              </div>`;
    });
    const remove_comm_btns = document.querySelectorAll(".remove_comment_btn");
    const change_comm_btns = document.querySelectorAll(".change_comment_btn");
    const comment_block = document.querySelectorAll(".comment_block");

    if (comment_block) {
      comment_block.forEach((el) => {
        el.addEventListener("click", () => {
          comment_block.forEach((e) => {
            if (e != el) {
              e.classList.remove("active_settings_review");
            }
          });
          el.classList.toggle("active_settings_review");
        });
      });
      remove_comm_btns.forEach((el) => {
        el.addEventListener("click", () => {
          reviews = reviews.filter((e) => e.rev_id != el.id);
          showInfo("Отзыв успешно удален");
          AddReview();
        });
      });
      change_comm_btns.forEach((el) => {
        el.addEventListener("click", () => {
          account_changes.innerHTML = null;
          account_changes.innerHTML += change_review_pop;
          const main_change_review_block = document.querySelector(
            ".change_review_form"
          );
          const new_review = document.getElementById("new_review");
          const save_new_review = document.querySelector(".save_new_review");
          const cancel_new_review =
            document.querySelector(".cancel_new_review");
          save_new_review.addEventListener("click", () => {
            reviews[el.id - 1].description = new_review.value;
            showInfo("Отзыв успешно изменен");
            AddReview();
            main_change_review_block.classList.add("hide_pop");
            setTimeout(() => {
              main_change_review_block.remove();
            }, 500);
          });
          cancel_new_review.addEventListener("click", () => {
            main_change_review_block.classList.add("hide_pop");
            setTimeout(() => {
              main_change_review_block.remove();
            }, 500);
          });
        });
      });
    }
  }
};

// Добавление отзыва клиента
const onAddReview = (description) => {
  reviews.push({
    rev_id: reviews.length + 1,
    user_id: AuthMe.id,
    name: AuthMe.name,
    description,
  });
  showInfo("Отзыв успешно добавлен");
  AddReview();
};

// Фильтр карточек по городам
const CardFilter = (text) => {
  let counter = 0;
  if (text.trim() != "") {
    document.querySelector(".cards_container").innerHTML = null;
    cards.map((el) => {
      if (el.city.toLowerCase().includes(text.toLowerCase())) {
        counter++;
        document.querySelector(
          ".cards_container"
        ).innerHTML += `<div class="card" id="${el.id}">
              <div class="card_image"><img src="${el.image}" alt="home"></div>
              <p class="card_category">${el.category}</p>
              <p class="card_price">${el.price} ₽</p>
              <div class="card_desc">
                <p class="card_size">${el.size} м²</p>
                <div class="card_circle"></div>
                <p class="card_bedrooms">${el.bedrooms} спальни</p>
                <div class="card_circle"></div>
                <p class="card_baths">${el.baths} ванны</p>
              </div>
              <p class="card_city">${el.city}</p>
            </div>`;
      }
    });
    if (counter == 0) {
      document.querySelector(".cards_container").innerHTML +=
        "<p>Ничего не найдено!</p>";
    }
  } else {
    document.querySelector(".cards_container").innerHTML = null;
    cards.map((el) => {
      document.querySelector(
        ".cards_container"
      ).innerHTML += `<div class="card" id="${el.id}">
              <div class="card_image"><img src="${el.image}" alt="home"></div>
              <p class="card_category">${el.category}</p>
              <p class="card_price">${el.price} ₽</p>
              <div class="card_desc">
                <p class="card_size">${el.size} м²</p>
                <div class="card_circle"></div>
                <p class="card_bedrooms">${el.bedrooms} спальни</p>
                <div class="card_circle"></div>
                <p class="card_baths">${el.baths} ванны</p>
              </div>
              <p class="card_city">${el.city}</p>
            </div>`;
    });
  }
  const home_list = document.querySelectorAll(".card");
  home_list.forEach((el) => {
    el.addEventListener("click", () => {
      showCard(el.id);
    });
  });
};

// Показать дом подробнее
const showCard = (id) => {
  show_card_block.innerHTML = null;
  for (el of cards) {
    if (el.id == id) {
      show_card_block.innerHTML += `<div class="show_card_content">
        <div class="card_description">
        <div class="header_card_description">
          <img src="${el.image}" alt="home_card">
          <div>
            <p>${el.category}</p>
            <h1>${el.price} ₽</h1>
            <p>Площадь: ${el.size} м²</p>
            <p>Комнат: ${el.bedrooms}</p>
            <p>Ванн: ${el.baths}</p>
            <p>Город: ${el.city}</p>
          </div>
        </div>
        <button type="button" class="buy_home_btn">Добавить в корзину</button>
        <button type="button" class="close_home_btn">Закрыть</button>
      </div>
      </div>`;
      break;
    }
  }
  const add_to_korz = document.querySelector(".buy_home_btn");
  const close_home_btn = document.querySelector(".close_home_btn");
  const main_card_desc = document.querySelector(".show_card_content");
  add_to_korz.addEventListener("click", () => {
    if (!AuthMe.isAuth) {
      if (popup_block.innerHTML == "") {
        popup_block.innerHTML += you_not_register_pop;

        const main_popup_block = document.querySelector(".review_popup_block");
        const pop_review_register_btn =
          document.querySelector(".pop_review_btn");
        const pop_review_okay_btn = document.querySelector(".pop_review_okay");

        pop_review_register_btn.addEventListener("click", () => {
          main_popup_block.classList.add("hide_pop");
          onRegisterPage(true);
          setTimeout(() => {
            main_popup_block.remove();
          }, 500);
        });

        pop_review_okay_btn.addEventListener("click", () => {
          main_popup_block.classList.add("hide_pop");
          setTimeout(() => {
            main_popup_block.remove();
          }, 500);
        });
      }
    } else {
      for (el of cards) {
        if (el.id == id) {
          if (AddToKorzina(el)) {
            showInfo("Этот дом есть в корзине");
            break;
          } else {
            showInfo("Дом успешно добавлен в корзину");
            break;
          }
        }
      }
      main_card_desc.classList.add("hide_pop");
      setTimeout(() => {
        main_card_desc.remove();
      }, 500);
    }
  });
  close_home_btn.addEventListener("click", () => {
    main_card_desc.classList.add("hide_pop");
    setTimeout(() => {
      main_card_desc.remove();
    }, 500);
  });
};

// Предосмотр дома в корзине
const showCardInKorzina = (id) => {
  show_card_block.innerHTML = null;
  for (el of AuthMe.korzina) {
    if (el.id == id) {
      show_card_block.innerHTML += `<div class="show_card_content">
        <div class="card_description">
        <div class="header_card_description">
          <img src="${el.image}" alt="home_card">
          <div>
            <p>${el.category}</p>
            <h1>${el.price} ₽</h1>
            <p>Площадь: ${el.size} м²</p>
            <p>Комнат: ${el.bedrooms}</p>
            <p>Ванн: ${el.baths}</p>
            <p>Город: ${el.city}</p>
          </div>
        </div>
        <button type="button" class="close_home_btn">Закрыть</button>
      </div>
      </div>`;
      break;
    }
  }
  const close_korzina_btn = document.querySelector(".close_home_btn");
  const main_card_desc = document.querySelector(".show_card_content");
  close_korzina_btn.addEventListener("click", () => {
    main_card_desc.classList.add("hide_pop");
    setTimeout(() => {
      main_card_desc.remove();
    }, 500);
  });
};

// Страницы
const registerPage = `<div class="login_register_block">
<div class="main_login_register_block">
<div class="close_btn"><img src="assets/images/OtherImages/close_form_icon.png" alt="close"></div>
  <form class="login_form">
    <h1 class="login_title">Вход</h1>
    <input type="email" id="email_login" placeholder="Введите email" />
    <input
      type="password"
      id="password_login"
      placeholder="Введите пароль"
    />
    <p class="error_login_text"></p>
    <button type="button" class="login_btn">Войти</button>
    <p class="no_login">
      Не зарегистрированы?
      <a href="#" class="go_register_link">Регистрация</a>
    </p>
  </form>
  <form class="register_form">
    <h1 class="register_title">Регистрация</h1>
    <div class="inputs_register">
      <input
        type="text"
        placeholder="Введите свое имя"
        id="name_register"
      />
      <input
        type="email"
        placeholder="Введите свой email"
        id="email_register"
      />
      <input
        type="password"
        placeholder="Введите пароль"
        id="password_register"
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        id="auth_password_register"
      />
    </div>
    <p class="error_register_text"></p>
    <button type="button" class="register_btn">Регистрация</button>
    <p class="yes_register">
      Уже зарегистрированы? <a href="#" class="go_login_link">Войти</a>
    </p>
  </form>
</div>
</div>`;
const mainPage = `<div class="main">
        <div class="container">
          <div class="good_home_left">
            <h1 class="home_title">НАЙДИ СВОЙ<br />ИДЕАЛЬНЫЙ ДОМ<br />У НАС</h1>
            <p class="home_subtitle">
              С другой стороны консультация с широким активом влечет за собой
              процесс<br />внедрения и модернизации систем массвого участия
            </p>
            <button type="button" class="check_spisok_btn">ПОСМОТРЕТЬ СПИСОК</button>
          </div>
          <div class="good_home_right">
            <h1 class="home_right_title">Связаться с агентом!</h1>
            <div class="home_box">
              <p>Телефон: (999) 123-4567</p>
              <p>Email: admin@admin.ru</p>
              <p>Офис: 1234 ул. Абельмановская, Москва</p>
            </div>
            <button type="button" class="btn_home_register">
              БЕСПЛАТНАЯ РЕГИСТРАЦИЯ
            </button>
          </div>
        </div>
      </div>
      <div class="doverie_block">
        <div class="container">
          <h1>Агентство недвижимости, которому<br>можно доверять</h1>
          <p class="sub_title">Идейные соображения высшего порядка, а также реализация намеченных плановых заданий<br>в значительной степени обуславливает создание форм развития.</p>
          <div class="doverie_cards">
            <div class="dov_card">
              <div class="dov_image"><img src="assets/images/OtherImages/commision.svg" alt="commision"></div>
              <p class="dov_title">БЕЗ СКРЫТЫХ КОМИССИЙ</p>
              <p class="dov_subtitle">Не следует, однако забывать, что<br>укрепление и развитие структуры<br>играет важную роль в формировании<br>новых предложений.</p>
            </div>
            <div class="dov_card">
              <div class="dov_image"><img src="assets/images/OtherImages/search.svg" alt="commision"></div>
              <p class="dov_title">БЕСПЛАТНЫЙ ПОИСК</p>
              <p class="dov_subtitle">Не следует, однако забывать, что<br>укрепление и развитие структуры<br>играет важную роль в формировании<br>новых предложений.</p>
            </div>
            <div class="dov_card">
              <div class="dov_image"><img src="assets/images/OtherImages/star.svg" alt="commision"></div>
              <p class="dov_title">БЕСПЛАТНАЯ ОЦЕНКА НЕДВИЖИМОСТИ</p>
              <p class="dov_subtitle">Не следует, однако забывать, что<br>укрепление и развитие структуры<br>играет важную роль в формировании<br>новых предложений.</p>
            </div>
          </div>
          <div class="find_agent_block">
            <button type="button" class="btn_find_agent">НАЙТИ АГЕНТА</button>
          </div>
        </div>
      </div>`;
const adsPage = `<div class="ads">
        <div class="ads_header_block">
          <h1 class="ads_title">Объявления</h1>
          <p class="ads_subtitle">
            Не следует забывать, что укрепление и развитие структуры играет важную
            роль в,<br />формировании новых предложений
          </p>
        </div>
        <div class="container">
          <div class="search_block">
            <input
              type="text"
              id="search_card_city"
              placeholder="Поиск по городу"
            />
            <button type="button" class="search_btn">ПОИСК</button>
          </div>
          <div class="cards_container">
          </div>
        </div>
      </div>`;
const ourAgents = `<div class="our_agents">
        <div class="container">
          <h1 class="our_agents_title">Наши агенты</h1>
          <p class="our_agents_subtitle">
            Не следует, однако забывать, что укрепление и развитие структуры
            играет<br />важную роль в формировании новых предложений.
          </p>
        </div>
      </div>
       <div class="gallery_block">
        <div class="container">
          <div class="photo_gallery">
            <div
              class="image_1"
              style="
                background: url('assets/images/PhotoGallery/photo_1.jpg');
                background-size: cover;
                background-position: center;
              "
            ></div>
            <div
              class="image_2"
              style="
                background: url('assets/images/PhotoGallery/photo_2.jpg');
                background-size: cover;
                background-position: center;
              "
            ></div>
            <div
              class="image_3"
              style="
                background: url('assets/images/PhotoGallery/photo_3.jpg');
                background-size: cover;
                background-position: center;
              "
            ></div>
            <div
              class="image_4"
              style="
                background: url('assets/images/PhotoGallery/photo_4.jpg');
                background-size: cover;
                background-position: center;
              "
            ></div>
          </div>
        </div>
      </div>
      <div class="our_agents_container">
      <div class="container">
        <div class="swiper agents_swiper">
          <div class="swiper-wrapper">
            <div class="employ_card swiper-slide">
              <div class="employ_avatar">
                <img
                  src="assets/images/EmployAvatar/Robert_Hendz.jpg"
                  alt="avatar"
                />
              </div>
              <p class="employ_name">Роберт Хендз</p>
              <p class="employ_category">Агент по жилой недвижимости</p>
              <p class="employ_desc">
                Повседневная практика показывает, что постоянный количественный
                рост и сфера нашей активности требуют от нас анализа
                соответствующий условий активизации. Значимость этих проблем
                настолько очевидна, что начало повседневной работы по
                формированию позиции позволяет выполнять важные задания по
                разработке соответствующий условий активизации.
              </p>
            </div>
            <div class="employ_card swiper-slide">
              <div class="employ_avatar">
                <img
                  src="assets/images/EmployAvatar/Lorin_James.jpg"
                  alt="avatar"
                />
              </div>
              <p class="employ_name">Лорин Джеймс</p>
              <p class="employ_category">Агент по жилой недвижимости</p>
              <p class="employ_desc">
                Повседневная практика показывает, что постоянный количественный
                рост и сфера нашей активности требуют от нас анализа
                соответствующий условий активизации. Значимость этих проблем
                настолько очевидна, что начало повседневной работы по
                формированию позиции позволяет выполнять важные задания по
                разработке соответствующий условий активизации.
              </p>
            </div>
            <div class="employ_card swiper-slide">
              <div class="employ_avatar">
                <img
                  src="assets/images/EmployAvatar/Mike_Branson.jpg"
                  alt="avatar"
                />
              </div>
              <p class="employ_name">Майк Бренсон</p>
              <p class="employ_category">Агент по жилой недвижимости</p>
              <p class="employ_desc">
                Повседневная практика показывает, что постоянный количественный
                рост и сфера нашей активности требуют от нас анализа
                соответствующий условий активизации. Значимость этих проблем
                настолько очевидна, что начало повседневной работы по
                формированию позиции позволяет выполнять важные задания по
                разработке соответствующий условий активизации.
              </p>
            </div>
            <div class="employ_card swiper-slide">
              <div class="employ_avatar">
                <img
                  src="assets/images/EmployAvatar/Bred_Slator.jpg"
                  alt="avatar"
                />
              </div>
              <p class="employ_name">Брэт Слейтор</p>
              <p class="employ_category">Агент по жилой недвижимости</p>
              <p class="employ_desc">
                Повседневная практика показывает, что постоянный количественный
                рост и сфера нашей активности требуют от нас анализа
                соответствующий условий активизации. Значимость этих проблем
                настолько очевидна, что начало повседневной работы по
                формированию позиции позволяет выполнять важные задания по
                разработке соответствующий условий активизации.
              </p>
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      </div>
      `;
const reivewPage = `<div class="reviews_title">
        <h1 class="rev_title">ОТЗЫВЫ</h1>
        <p class="rev_sub">
          Не следует, однако забывать, что укрепление и развитие структуры
          играет<br />важную роль в формировании новых предложений.
        </p>
      </div>
      <div class="reviews_block">
        <div class="container">
          <form class="send_review">
            <input type="text" placeholder="Введите отзыв" id="input_review" />
            <button type="button" class="send_review_btn">
              ОСТАВИТЬ ОТЗЫВ
            </button>
          </form>
          <div class="reviews_clients">
          </div>
        </div>
      </div>`;
const korzinaPage = `<div class="your_korzina">
        <div class="korzina_header_block"><h1>Корзина</h1></div>        
        <div class="container">
          <div class="your_homes"></div>
        </div>
      </div>
      <div class="total_money_info"></div>
      <button type="button" class="buy_homes_btn">Оплатить</button>`;

// Popups блоки
const you_in_register_pop = `<div class="you_in_register_block">
  <div class="you_in_register">
    <img src="assets/images/OtherImages/you_register.png" alt="smile" />
    <h1>Вы уже зарегистрированы!</h1>
    <button type="button" class="register_popup_btn">Отлично</button>
  </div>
  </div>`;
const you_not_register_pop = `<div class="review_popup_block">
<div class="review_popup">
  <img
    src="assets/images/OtherImages/not_register.png"
    alt="not_register"
  />
  <h1>Вы не зарегистрированы :(</h1>
  <div class="review_popup_btns">
    <button type="button" class="pop_review_btn">Регистрация</button>
    <button type="button" class="pop_review_okay">Ок</button>
  </div>
</div>
</div>`;
const change_name_pop = `<form class="change_account_name_form">
        <div class="change_account_name_block" >
          <h1>Изменить имя</h1>
          <input type="text" id="new_name" placeholder="Введите новое имя" />
          <p class="change_name_error_text"></p>
          <div class="change_account_name_btns">
            <button type="button" class="save_new_name">Изменить</button>
            <button type="button" class="cancel_new_name">Отмена</button>
          </div>
        </div>
      </form>`;
const change_email_pop = `<form class="change_account_email_form">
        <div class="change_account_email_block" >
          <h1>Изменить email</h1>
          <input type="email" id="new_email" placeholder="Введите новый email" />
          <div class="change_account_name_btns">
            <button type="button" class="save_new_email">Изменить</button>
            <button type="button" class="cancel_new_email">Отмена</button>
          </div>
        </div>
      </form>`;
const change_password_pop = `<form class="change_account_password_form">
        <div class="change_account_password_block" >
          <h1>Изменить пароль</h1>
          <input type="password" id="old_password" placeholder="Введите старый пароль" />
          <input type="password" id="new_password" placeholder="Введите новый пароль" />
          <input type="password" id="auth_new_password" placeholder="Подтвердите пароль" />
          <p class="change_password_error_text"></p>
          <div class="change_account_name_btns">
            <button type="button" class="save_new_password">Изменить</button>
            <button type="button" class="cancel_new_password">Отмена</button>
          </div>
        </div>
      </form>`;
const buy_done = `<div class="you_in_register_block">
<div class="you_in_register">
  <img src="assets/images/OtherImages/money_done.png" alt="smile" />
  <h1>Оплата прошла успешно!</h1>
  <button type="button" class="register_popup_btn">Отлично</button>
</div>
</div>`;

// Popup функции (часто используемые)
const youNotRegister = () => {
  if (popup_block.innerHTML == "") {
    popup_block.innerHTML += you_not_register_pop;

    const main_popup_block = document.querySelector(".review_popup_block");
    const pop_review_register_btn = document.querySelector(".pop_review_btn");
    const pop_review_okay_btn = document.querySelector(".pop_review_okay");

    pop_review_register_btn.addEventListener("click", () => {
      main_popup_block.classList.add("hide_pop");
      onRegisterPage(true);
      setTimeout(() => {
        main_popup_block.remove();
      }, 500);
    });

    pop_review_okay_btn.addEventListener("click", () => {
      main_popup_block.classList.add("hide_pop");
      setTimeout(() => {
        main_popup_block.remove();
      }, 500);
    });
  }
};
// Функции для страниц
const onRegisterPage = (register) => {
  register_block.innerHTML += registerPage;

  const login_email = document.getElementById("email_login");
  const login_password = document.getElementById("password_login");
  const error_login_text = document.querySelector(".error_login_text");

  const register_name = document.getElementById("name_register");
  const register_password = document.getElementById("password_register");
  const register_email = document.getElementById("email_register");
  const auth_password = document.getElementById("auth_password_register");
  const error_register_text = document.querySelector(".error_register_text");

  const go_register_link = document.querySelector(".go_register_link");
  const go_login_link = document.querySelector(".go_login_link");
  const main_register_block = document.querySelector(
    ".main_login_register_block"
  );
  const close_form = document.querySelector(".close_btn");
  const login_register_block = document.querySelector(".login_register_block");
  const login_btn = document.querySelector(".login_btn");
  const register_btn = document.querySelector(".register_btn");

  login_btn.addEventListener("click", () => {
    if (CheckAccount(login_email.value, login_password.value)) {
      login_email.value = "";
      login_password.value = "";
      error_login_text.innerHTML = "";
      showInfo(`Добро пожаловать, ${AuthMe.name}`);
      if (nav_links[3].classList.contains("active_nav_link")) {
        AddReview();
      }
      if (body.classList.contains("active_burger")) {
        body.classList.remove("active_burger");
        account_settings.classList.remove("settings_burger_active");
        change_theme_block.classList.remove("change_theme_burger_active");
      }
      login_register_block.classList.add("hide");
      setTimeout(() => {
        login_register_block.remove();
      }, 1000);
    } else {
      error_login_text.innerHTML = "Неправильный логин или пароль";
    }
  });

  register_btn.addEventListener("click", () => {
    if (
      register_name.value.trim() == "" ||
      register_email.value.trim() == "" ||
      register_password.value.trim() == "" ||
      auth_password.value.trim() == ""
    ) {
      error_register_text.innerHTML = "Введите все поля";
    } else if (register_name.value.length > 20) {
      error_register_text.innerHTML = "Имя до 20 символов";
    } else if (register_password.value.length < 8) {
      error_register_text.innerHTML = "Пароль от 8 символов";
    } else if (register_password.value !== auth_password.value) {
      error_register_text.innerHTML = "Пароли не совпадают";
    } else {
      if (
        registerAccount(
          register_name.value,
          register_email.value,
          register_password.value
        )
      ) {
        error_register_text.innerHTML = "Такой аккаунт уже существует";
      } else {
        showInfo("Аккаунт успешно создан");
        main_register_block.classList.remove("active_register");
        error_register_text.innerHTML = "";
      }
    }
  });

  close_form.addEventListener("click", () => {
    login_register_block.classList.add("hide");
    setTimeout(() => {
      login_register_block.remove();
    }, 1000);
  });

  if (register) {
    main_register_block.classList.add("active_register");
  }

  go_register_link.addEventListener("click", () => {
    main_register_block.classList.add("active_register");
  });
  go_login_link.addEventListener("click", () => {
    main_register_block.classList.remove("active_register");
  });
};
const onMainPage = () => {
  main.innerHTML = null;
  main.innerHTML += mainPage;

  const checkSpisok = document.querySelector(".check_spisok_btn");
  const findAgentBtn = document.querySelector(".btn_find_agent");
  const freeRegisterBtn = document.querySelector(".btn_home_register");

  freeRegisterBtn.addEventListener("click", () => {
    if (AuthMe.isAuth) {
      popup_block.innerHTML += you_in_register_pop;
      const okay = document.querySelector(".register_popup_btn");
      const you_in_register_main = document.querySelector(
        ".you_in_register_block"
      );
      okay.addEventListener("click", () => {
        you_in_register_main.classList.add("hide_pop");
        setTimeout(() => {
          you_in_register_main.remove();
        }, 500);
      });
    } else {
      onRegisterPage(true);
    }
  });

  checkSpisok.addEventListener("click", () => {
    onAdsPage();
    nav_links[0].classList.remove("active_nav_link");
    nav_links[1].classList.add("active_nav_link");
  });
  findAgentBtn.addEventListener("click", () => {
    onOurAgents();
    nav_links[0].classList.remove("active_nav_link");
    nav_links[2].classList.add("active_nav_link");
  });
};
const onAdsPage = () => {
  main.innerHTML = null;
  main.innerHTML += adsPage;

  AddAdsCard();

  const searchButton = document.querySelector(".search_btn");
  const inputCardCity = document.querySelector("#search_card_city");

  inputCardCity.addEventListener("keypress", (k) => {
    if (k.key == "Enter") {
      CardFilter(inputCardCity.value);
    }
  });
  searchButton.addEventListener("click", () => {
    CardFilter(inputCardCity.value);
  });
};
const onOurAgents = () => {
  main.innerHTML = null;
  main.innerHTML += ourAgents;
  // СЛАЙДЕР
  let swiper = new Swiper(".agents_swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};
const onReviewPage = () => {
  main.innerHTML = null;
  main.innerHTML += reivewPage;
  const input_review = document.getElementById("input_review");
  const send_btn_review = document.querySelector(".send_review_btn");

  AddReview();

  input_review.addEventListener("keypress", (k) => {
    if (k.key == "Enter") {
      if (!AuthMe.isAuth) {
        youNotRegister();
      } else if (input_review.value.trim() != "") {
        onAddReview(input_review.value);
        input_review.value = "";
      }
    }
  });

  send_btn_review.addEventListener("click", () => {
    if (!AuthMe.isAuth) {
      youNotRegister();
    } else if (input_review.value.trim() != "") {
      onAddReview(input_review.value);
      input_review.value = "";
    }
  });
};
const onKorzina = () => {
  main.innerHTML = null;
  main.innerHTML += korzinaPage;
  AddKorzina();
  getTotalMoneyKorzina();
  const buy_homes_btn = document.querySelector(".buy_homes_btn");
  buy_homes_btn.addEventListener("click", () => {
    if (AuthMe.korzina.length == 0) {
      showInfo("Корзина пуста");
    } else {
      let your_money = Number(AuthMe.money.replace(/\s+/g, ""));
      let total_homes_money = 0;
      for (el of AuthMe.korzina) {
        total_homes_money += Number(el.price.replace(/\s+/g, ""));
      }
      if (your_money - total_homes_money < 0) {
        showInfo("Недостаточно средств");
      } else {
        for (el of AuthMe.korzina) {
          cards = cards.filter((e) => e.id != el.id);
          accounts.forEach((acc) => {
            acc.korzina = acc.korzina.filter((e) => e.id != el.id);
          });
        }
        AuthMe.korzina = [];
        AuthMe.money = String(your_money - total_homes_money).replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
        for (el of accounts) {
          if (el.id == AuthMe.id) {
            el.korzina = AuthMe.korzina;
            el.money = AuthMe.money;
            break;
          }
        }
        if (popup_block.innerHTML == "") {
          popup_block.innerHTML += buy_done;

          const main_popup_block = document.querySelector(
            ".you_in_register_block"
          );
          const pop_review_okay_btn = document.querySelector(
            ".register_popup_btn"
          );

          pop_review_okay_btn.addEventListener("click", () => {
            main_popup_block.classList.add("hide_pop");
            setTimeout(() => {
              main_popup_block.remove();
            }, 500);
          });
        }
        getTotalMoneyKorzina();
        AddKorzina();
        checkMoney();
      }
    }
  });
};

// Выпадающее меню в бургере
name_account.addEventListener("click", () => {
  if (body.classList.contains("active_burger")) {
    change_theme_block.classList.toggle("change_theme_burger_active");
    account_settings.classList.toggle("settings_burger_active");
  }
});

// Кнопка пополнения счета
add_account_money.addEventListener("click", () => {
  checkMoney("+");
});

// Кнопка изменения имени
change_account_name.addEventListener("click", () => {
  account_changes.innerHTML = null;
  account_changes.innerHTML += change_name_pop;
  const main_change_name_block = document.querySelector(
    ".change_account_name_form"
  );
  const save_new_name_btn = document.querySelector(".save_new_name");
  const cancel_new_name_btn = document.querySelector(".cancel_new_name");
  const new_name_text = document.getElementById("new_name");
  const error_name_text = document.querySelector(".change_name_error_text");
  save_new_name_btn.addEventListener("click", () => {
    if (new_name_text.value.length > 20) {
      error_name_text.innerHTML = "Имя до 20 символов";
    } else {
      change_name(new_name_text.value);
      showInfo("Имя успешно изменено");
      main_change_name_block.classList.add("hide_pop");
      setTimeout(() => {
        main_change_name_block.remove();
      }, 500);
    }
  });
  cancel_new_name_btn.addEventListener("click", () => {
    main_change_name_block.classList.add("hide_pop");
    setTimeout(() => {
      main_change_name_block.remove();
    }, 500);
  });
});

// Кнопка изменения email
change_account_email.addEventListener("click", () => {
  account_changes.innerHTML = null;
  account_changes.innerHTML += change_email_pop;
  const main_change_email_block = document.querySelector(
    ".change_account_email_form"
  );
  const save_new_email_btn = document.querySelector(".save_new_email");
  const cancel_new_email_btn = document.querySelector(".cancel_new_email");
  const new_email_text = document.getElementById("new_email");
  save_new_email_btn.addEventListener("click", () => {
    change_email(new_email_text.value);
    showInfo("Email успешно изменен");
    main_change_email_block.classList.add("hide_pop");
    setTimeout(() => {
      main_change_email_block.remove();
    }, 500);
  });
  cancel_new_email_btn.addEventListener("click", () => {
    main_change_email_block.classList.add("hide_pop");
    setTimeout(() => {
      main_change_email_block.remove();
    }, 500);
  });
});

// Кнопка изменения пароля
change_account_password.addEventListener("click", () => {
  account_changes.innerHTML = null;
  account_changes.innerHTML += change_password_pop;
  const main_change_password_block = document.querySelector(
    ".change_account_password_form"
  );
  const old_password = document.getElementById("old_password");
  const new_password = document.getElementById("new_password");
  const auth_new_password = document.getElementById("auth_new_password");
  const save_new_password = document.querySelector(".save_new_password");
  const cancel_new_password = document.querySelector(".cancel_new_password");
  const change_password_error_text = document.querySelector(
    ".change_password_error_text"
  );
  save_new_password.addEventListener("click", () => {
    if (old_password.value !== AuthMe.password) {
      change_password_error_text.innerHTML = "Неверно введен старый пароль";
    } else if (new_password.value != auth_new_password.value) {
      change_password_error_text.innerHTML = "Неверно введен повторный пароль";
    } else if (new_password.value.length < 8) {
      change_password_error_text.innerHTML = "Пароль от 8 символов";
    } else {
      change_password(new_password.value);
      showInfo("Пароль успешно изменен");
      change_password_error_text.innerHTML = "";
      main_change_password_block.classList.add("hide_pop");
      setTimeout(() => {
        main_change_password_block.remove();
      }, 500);
    }
  });
  cancel_new_password.addEventListener("click", () => {
    main_change_password_block.classList.add("hide_pop");
    setTimeout(() => {
      main_change_password_block.remove();
    }, 500);
  });
});

// Кнопка выхода из аккаунта
logout_account.addEventListener("click", () => {
  showInfo(`До свидания, ${AuthMe.name}`);
  name_account.innerHTML = null;
  account_settings.classList.remove("settings_burger_active");
  change_theme_block.classList.remove("change_theme_burger_active");
  logoutAccout();
  if (nav_links[3].classList.contains("active_nav_link")) {
    AddReview();
  } else if (nav_links[4].classList.contains("active_nav_link")) {
    nav_links[4].classList.remove("active_nav_link");
    nav_links[0].classList.add("active_nav_link");
    onMainPage();
  }
});

// Переадрисация страниц
nav_links.forEach((el) => {
  el.addEventListener("click", () => {
    nav_links.forEach((e) => {
      e.classList.remove("active_nav_link");
    });
    body.classList.remove("active_burger");
    el.classList.add("active_nav_link");
    switch (el.innerHTML) {
      case "Главная":
        onMainPage();
        break;
      case "Объявления":
        onAdsPage();
        break;
      case "Команда":
        onOurAgents();
        break;
      case "Отзывы":
        onReviewPage();
        break;
      case "Корзина":
        if (!AuthMe.isAuth) {
          youNotRegister();
          el.classList.remove("active_nav_link");
          nav_links[0].classList.add("active_nav_link");
          onMainPage();
        } else {
          onKorzina();
        }
        break;
    }
  });
});

// Нажатие на логотип
logo.addEventListener("click", () => {
  onMainPage();
  nav_links.forEach((el) => {
    el.classList.remove("active_nav_link");
  });
  nav_links[0].classList.add("active_nav_link");
});

// Темная тема
change_theme_btn.addEventListener("click", () => {
  body.classList.toggle("darkTheme");
});

// Регистрационная форма
login_register.addEventListener("click", () => {
  onRegisterPage();
});

// СТАРТОВАЯ СТРАНИЧКА
onMainPage();
