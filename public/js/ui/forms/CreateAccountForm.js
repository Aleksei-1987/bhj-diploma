/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (error, response) => {
      if (response && response.success) {
        App.getModal("createAccount").close();
        App.update();
        this.element.reset();
        return;
      }
      alert(response.error);
      this.element.reset();
    });
  }
}