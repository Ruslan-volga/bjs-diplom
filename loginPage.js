const userForm = new UserForm();


userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            
            location.reload(); 
        } else {
            
            console.log(response.error || "Ошибка авторизации");
        }
    });
};


userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            
            location.reload(); 
        } else {
            console.log(response.error || "Ошибка регистрации");
        }
    });
};