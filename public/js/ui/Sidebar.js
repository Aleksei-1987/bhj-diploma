/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector(".sidebar-mini");
    const toggle = document.querySelector(".sidebar-toggle");

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerBtn = document.querySelector(".menu-item_register");
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("register").open();
    });

    const loginBtn = document.querySelector(".menu-item_login");
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("login").open();
    })

    const logoutBtn = document.querySelector(".menu-item_logout");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      User.logout((error, response) => {
        if(response.success){
          App.setState("init")
        } else {
          return;
        }
      })
    })
  }
}
