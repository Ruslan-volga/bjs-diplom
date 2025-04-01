const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload(); 
        } else {
            const message = "Ошибка авторизации";
            this.setLoginErrorMessage(message); 
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload(); 
        } else {
            const message = "Ошибка регистрации";
            this.setRegisterErrorMessage(message); 
        }
    });
};