const userForm = new UserForm();

// Обработчик для формы входа
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload(); 
        } else {
            // Используем сообщение от сервера
            this.setLoginErrorMessage(response.error || "Ошибка авторизации");
        }
    });
};

// Обработчик для формы регистрации
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload(); 
        } else {
            // Используем сообщение от сервера
            this.setRegisterErrorMessage(response.error || "Ошибка регистрации");
        }
    });
};