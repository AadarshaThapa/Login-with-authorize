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
        .when('/details', {
            templateUrl: 'Form.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}])
myApp.factory('DataService', function () {
    var data1 = [];

    return {
        setData: function (newData) {
            data1 = angular.copy(newData);
        },
        getData: function () {
            return data1;
        }
    };
});


myApp.controller('DashboardController', function ($scope,  $location,LoginService) {
    var dataKey = 'yourDataKey'; 

    var data1 = JSON.parse(localStorage.getItem(dataKey)) || [];


    $scope.selectedCard = {};
  
    $scope.data =[];
    $scope.lists = []; 

   
    $scope.lists = [
        { "number": "9876", "item": "Item1", "value": "543210", imgUrl: "AUpscaled.png", "title": "CONSTRUCTION & INFRASTRUCTURE", "remarks": "Agility to oversee any avoidable repairs, compliance failures." },
        { "number": "1234", "item": "Item2", "value": "678899", imgUrl: "AUpscaled.png", "title": "INDUSTRIAL MANUFACTURING", "remarks": "Guide your technicians with digital processes to avoid downtime." },
        { "number": "4567", "item": "Item3", "value": "987654", imgUrl: "AUpscaled.png", "title": "ENERGY & UTILITIES", "remarks": "Streamline work orders and manage workflows most efficiently." },
    ];

    $scope.navigateToDetails = function(index,name) {
        data2=[];
        data1 = [];
        localStorage.removeItem(dataKey);

     
        $scope.selectedCard = {};
        if (data1.length > 0) {
            $scope.selectedCard = angular.copy(data1[0]);
        }

        console.log($scope.selectedCard)
        $scope.data.push($scope.lists[name])
        data1.push($scope.data[0]);

        localStorage.setItem(dataKey, JSON.stringify(data1));

        
        

        // var clickedElement = angular.element(event.currentTarget);
       
        // console.log('Clicked element:'+ index , clickedElement);
        // console.log('index: ', index);
        // console.log('name: ', name); 

        $location.path('/details');
        
        
    };
  

    var storedData = localStorage.getItem(dataKey);
    $scope.storedData = storedData ? JSON.parse(storedData) : [];


    // $scope.selectedCard = angular.copy($scope.lists[name]);
    // console.log($scope.selectedCard)
 
   
    $scope.goBack = function (event){
        $location.path('/dashboard');  
     }
   
     $scope.Edit = function () {
      
        var latestIndex = $scope.data1.length - 1;

  
        // $scope.storedData[latestIndex].number = $scope.selectedCard.number;
        // $scope.storedData[latestIndex].item = $scope.selectedCard.item;
        // $scope.storedData[latestIndex].value = $scope.selectedCard.value;
        // $scope.storedData[latestIndex].title = $scope.selectedCard.title;
        // $scope.storedData[latestIndex].remarks = $scope.selectedCard.remarks;
        data1[latestIndex].number = $scope.selectedCard.number;
        data1[latestIndex].item = $scope.selectedCard.item;
        data1[latestIndex].value = $scope.selectedCard.value;
        data1[latestIndex].title = $scope.selectedCard.title;
        data1[latestIndex].remarks = $scope.selectedCard.remarks;

      
        localStorage.setItem(dataKey, JSON.stringify(data1));
        console.log(data1)

  
        localStorage.setItem(dataKey, JSON.stringify($scope.storedData));
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


myApp.controller('myController', function ($scope, $location,LoginService) {

    $scope.selectedCard = {};
    $scope.lists = []; // Initialize lists as an empty array

    // Populate lists with data
    $scope.lists = [
        { "number": "9876", "item": "Item1", "value": "543210", imgUrl: "AUpscaled.png", "title": "CONSTRUCTION & INFRASTRUCTURE", "remarks": "Agility to oversee any avoidable repairs, compliance failures." },
        { "number": "1234", "item": "Item2", "value": "678899", imgUrl: "AUpscaled.png", "title": "INDUSTRIAL MANUFACTURING", "remarks": "Guide your technicians with digital processes to avoid downtime." },
        { "number": "4567", "item": "Item3", "value": "987654", imgUrl: "AUpscaled.png", "title": "ENERGY & UTILITIES", "remarks": "Streamline work orders and manage workflows most efficiently." },
    ];

    $scope.navigateToDetails = function(index,name) {
     
        $scope.selectedCard = angular.copy($scope.lists[name]);
        console.log($scope.selectedCard)

        var clickedElement = angular.element(event.currentTarget);
        // console.log('Clicked element:'+ index , clickedElement);
        // console.log('index: ', index);
        // console.log('name: ', name); 

        $location.path('/details');
    };

   


    
        
 $scope.goBack = function (event){
    $location.path('/dashboard');  
 }


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


