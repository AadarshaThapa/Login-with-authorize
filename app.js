var myApp = angular.module('myApp', []);

myApp.controller('myController', function ($scope) {
    
    if (!localStorage.getItem('LoginCred')) {
        var defaultLoginData = {
            username: 'test',
            password: 'test'
        };

 
        localStorage.setItem('LoginCred', JSON.stringify([defaultLoginData]));
    }


    var storedLoginData = JSON.parse(localStorage.getItem('LoginCred')) || [];

   
    $scope.loginData = {
        username: '',
        password: ''
    };

   
    if (storedLoginData.length > 0) {
        $scope.loginDataList = storedLoginData;
    } else {
        $scope.loginDataList = [];
    }

    $scope.loginButton = function () {
       
        var isLoginSuccessful = false;
        for (var i = 0; i < $scope.loginDataList.length; i++) {
            var storedCredentials = $scope.loginDataList[i];
            if (storedCredentials.username === $scope.loginData.username && storedCredentials.password === $scope.loginData.password) {
                isLoginSuccessful = true;
                break;
            }
        }
console.log($scope.loginDataList)
    
        if (isLoginSuccessful) {
            alert('Login successful!');
            //need to route to dashboard

        } else {
            alert('Incorrect username or password.');
        }
    };
});
