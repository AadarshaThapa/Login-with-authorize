var myApp = angular.module('myApp', ['ngRoute', 'chart.js']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'LoginPage.html',
        })
        .when('/dashboard', {
            templateUrl: 'Dashboard.html',
            controller: 'DashboardController'
        })
        .when('/details', {
            templateUrl: 'Form.html',
            controller: 'DetailsController'
        })
        .when('/reports', {
            templateUrl: 'Reports.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

myApp.factory("tilesService", function () {
    var tiles = [
        { "number": "9876", "item": "Item1", "value": "543210", imgUrl: "AUpscaled.png", "title": "CONSTRUCTION & INFRASTRUCTURE", "remarks": "Agility to oversee any avoidable repairs, compliance failures." },
        { "number": "1234", "item": "Item2", "value": "678899", imgUrl: "AUpscaled.png", "title": "INDUSTRIAL MANUFACTURING", "remarks": "Guide your technicians with digital processes to avoid downtime." },
        { "number": "4567", "item": "Item3", "value": "987654", imgUrl: "AUpscaled.png", "title": "ENERGY & UTILITIES", "remarks": "Streamline work orders and manage workflows most efficiently." },
    ];

    return {
        getTiles: function () {
            return tiles;
        }
    };
});

myApp.factory("indvTilesService", function () {
    var indivTiles = [];

    return {
        getTiles: function () {
            return indivTiles;
        },
        addTile: function (tile) {
            indivTiles.push(tile);
            console.log(indivTiles);
        },
    };
});

myApp.service('LoginService', function () {
    var loginStatus = false;

    this.setLoginStatus = function (status) {
        loginStatus = status;
    };

    this.getLoginStatus = function () {
        return loginStatus;
    };
});

myApp.controller('DashboardController', function ($scope, $location, LoginService, tilesService, indvTilesService) {

    $scope.listtables = [
        {
            id: 1,
            name: "Jenson Delaney",
            email: "jsaf@mail.com",
            messagesCount: 3,
        },
        {
            id: 2,
            name: "Amaya Coffey",
            email: "amaya.coffey@mail.com",
            messagesCount: 1,
        },
        {
            id: 3,
            name: "Habib Joyce",
            email: "habib.joyce@mail.com",
            messagesCount: 5,
        },
        {
            id: 4,
            name: "Lilly-Ann Roche",
            email: "lilly-ann.roche@mail.com",
            messagesCount: 8,
        },
        
    ];
    $scope.tiles = tilesService.getTiles();

    $scope.navigateToDetails = function (tile) {
        indvTilesService.addTile(tile);
        $location.path('/details');
    };

    $scope.goBack = function (event) {
        $location.path('/dashboard');
    };

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

myApp.controller('DetailsController', function ($scope, $location, indvTilesService,tilesService) {

    var selectedTiles = indvTilesService.getTiles();
    $scope.selectedTile = selectedTiles[selectedTiles.length - 1];

    $scope.Edit = function () {
        var index = -1;
        for (var i = 0; i < tilesService.getTiles().length; i++) {
            if (tilesService.getTiles()[i].number === $scope.selectedTile.number) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            tilesService.getTiles()[index] = angular.copy($scope.selectedTile);
            console.log('Tile updated:', tilesService.getTiles()[index]);
        } else {
            console.log('Tile not found for updating.');
        }
    };

    $scope.goBack = function () {
        $location.path('/dashboard');
    };
});


myApp.controller('myController', function ($scope, $location, LoginService) {
    $scope.goBack = function (event) {
        $location.path('/dashboard');
    };

   
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
        }}

        if (isLoginSuccessful) {
            $location.path('/dashboard');  
        }
         else {
            alert('Incorrect username or password.');
        }
    };
});
