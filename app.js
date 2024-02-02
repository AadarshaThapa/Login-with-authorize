var myApp = angular.module('myApp', ['ngRoute', 'chart.js']);

myApp.service('LoginService', function () {
    var loginStatus = false;

    this.setLoginStatus = function (status) {
        loginStatus = status;
    };

    this.getLoginStatus = function () {
        return loginStatus;
    };
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'LoginPage.html',
        })
        .when('/dashboard', {
            templateUrl: 'Dashboard.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}])

myApp.controller('DashboardController', function ($scope, LoginService) {

    $scope.Logger = LoginService.getLoginStatus();

    $scope.$watch(
        function () {
            return LoginService.getLoginStatus();
        },
        function (newStatus) {
            $scope.Logger = newStatus;
            if (newStatus) {
                createCharts();
            }
        }
    );

    $scope.lists = [
        { title: 'User1', label: "Insights", remarks: "Performing Good" },
        { title: 'User2', label: "Insights", remarks: "Performing Good" },
        { title: 'User3', label: "Insights", remarks: "Performing Good" },
    ];

    $scope.charts = [
        {
            id: 'chart1',
            title: 'Line Chart',
            data: [[65, 59, 80, 81], [28, 48, 40, 19]],
            labels: ['January', 'February', 'March', 'April'],
            series: ['Series A', 'Series B'],
            options: { legend: { display: true } }
        }
    ];


    function createCharts() {
        var barData = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Bar Chart',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [65, 59, 80, 81, 56]
            }]
        };

        var barOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        };

        var barCtx = document.getElementById('barChart').getContext('2d');
        var barChart = new Chart(barCtx, {
            type: 'bar',
            data: barData,
            options: barOptions
        });

        var pieCtx = document.getElementById('dchart').getContext('2d');
        var pieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
                datasets: [{
                    label: "online tutorial subjects",
                    data: [20, 40, 13, 35, 20, 38],
                    backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
                    hoverOffset: 5
                }],
            },
            options: {
                responsive: false,
            },
        });


    }
});


myApp.controller('myController', function ($scope, $location,LoginService) {

 
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


    $scope.loginButton = function (event) {
        Logger="";
        $scope.Logger=false;
        // event.preventDefault(); 
       
        var isLoginSuccessful = false;
    for (var i = 0; i < $scope.loginDataList.length; i++) {
        var storedCredentials = $scope.loginDataList[i];
        if (
            storedCredentials.username === $scope.loginData.username &&
            storedCredentials.password === $scope.loginData.password
        ) {
            isLoginSuccessful = true;
            $scope.Logger = true;
            LoginService.setLoginStatus(true);
            break;
        }
    }


        if (isLoginSuccessful) {
            $location.path('/dashboard');  
        }
         else {
            alert('Incorrect username or password.');
        }
    };
});






  //  can use window method to redirect by
  //  $window.location.href = 'Dashboard.html';
