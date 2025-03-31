'use strict';
//Личный кабинет

//1. Выход из личного кабинета 
const logoutButtonOne = new LogoutButton();
logoutButtonOne.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

//2.Получение информации о пользователе 
ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//3.Получение текущих курсов валюты 
const ratesBoardOne = new RatesBoard();
const period = () => {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoardOne.clearTable();
            ratesBoardOne.fillTable(response.data);
        }
    })
}
period();
setInterval(period, 60000);

//4. Операции с деньгами
//4.1 Пополнение баланса 
const moneyManagerOne = new MoneyManager();
moneyManagerOne.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerOne.setMessage(response.success, 'Баланс пополнен');
        } else {
            moneyManagerOne.setMessage(response.success, response.error);
        }
    })
}

//4.2 конвертирование валюты 
moneyManagerOne.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerOne.setMessage(response.success, 'Конвертирование выполнено');
        } else {
            moneyManagerOne.setMessage(response.success, response.error);
        }
    })
};

//4.3 перевод валюты 
moneyManagerOne.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerOne.setMessage(response.success, 'Перевод выполнен');
        } else {
            moneyManagerOne.setMessage(response.success, response.error);
        }
    })
};


//5. Работа с избранным
const favoritesWidgetOne = new favoritesWidget();

//5.1 Запрос списка избранного: 
ApiConnector.getfavorites(response => {
    if(response.success) {
        favoritesWidgetOne.clearTable();
        favoritesWidgetOne.fillTable(response.data);
        moneyManagerOne.updateUsersList(response.data);
    }
});

//5.2 Добавление пользователя в список избранных: 
favoritesWidgetOne.addUserCallback = (data) => {
    ApiConnector.addUserTofavorites(data, (response) => {
        if(response.success) {
            favoritesWidgetOne.clearTable();
            favoritesWidgetOne.fillTable(response.data);
            moneyManagerOne.updateUsersList(response.data);
            favoritesWidgetOne.setMessage(response.success, 'Пользователь добавлен в список избранных');
        } else {
            favoritesWidgetOne.setMessage(response.success, response.error);
        }
    })
}

//5.3 Удаление пользователя из списка избранных: 
favoritesWidgetOne.removeUserCallback = (data) => {
    ApiConnector.removeUserfromfavorites(data, (response) => {
        if(response.success) {
            favoritesWidgetOne.clearTable();
            favoritesWidgetOne.fillTable(response.data);
            moneyManagerOne.updateUsersList(response.data);
            favoritesWidgetOne.setMessage(response.success, 'Пользователь удален из списка избранных');
        } else {
            favoritesWidgetOne.setMessage(response.success, response.error);
        }
    })
}
//camelCase