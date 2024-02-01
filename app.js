var myApp = angular.module('myApp',  ['ngRoute', 'chart.js']);

myApp.config(['$routeProvider' ,function($routeProvider){
    $routeProvider
    .when('/login',{
        templateUrl: 'LoginPage.html',
       
    })
    .when('/dashboard',{
        templateUrl: 'Dashboard.html',
        controller: 'DashboardController'
    })
    .otherwise({
        redirectTo:'/login'
    })
}])


myApp.controller('DashboardController', function ($scope) {

    $scope.barData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
            label: 'Bar Chart',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56]
        }]
    }

    $scope.barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    var ctx = document.getElementById('barChart').getContext('2d');

    
    $scope.barChart = new Chart(ctx, {
        type: 'bar',
        data: $scope.barData,
        options: $scope.barOptions
    });

     $scope.pieChart = new Chart(ctx, {
        type: 'bar',
        data: $scope.barData,
        options: $scope.barOptions
    });

    var dchrt = document.getElementById("dchart").getContext("2d");
      var chartId = new Chart(dchrt, {
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

    $scope.lists = [
        { title: 'User1', label: "Insights", remarks:"Performing Good" },
        { title: 'User2', label: "Insights", remarks:"Performing Good" },
        { title: 'User3', label: "Insights", remarks:"Performing Good" },

    ];


    


    $scope.charts = [
        {
            id: 'chart1',
            title: 'Line Chart',
            data: [[65, 59, 80, 81], [28, 48, 40, 19]],
            labels: ['January', 'February', 'March', 'April'],
            series: ['Series A', 'Series B'],
            options: { legend: { display: true } }
        }]

})

// var app = angular.module('dashboardApp', ['chart.js']);

//         app.controller('DashboardController', function ($scope) {

//             $scope.lists = [
//                 { title: 'List 1', items: ['Item 1', 'Item 2', 'Item 3'] },
//                 { title: 'List 2', items: ['Item A', 'Item B', 'Item C'] },

//             ];


//             $scope.dummyTiles = [
//                 { title: 'Tile 1', content: 'Content for Tile 1' },
//                 { title: 'Tile 2', content: 'Content for Tile 2' },
//                 { title: 'Tile 3', content: 'Content for Tile 3' }

//             ];


//             $scope.charts = [
//                 {
//                     id: 'chart1',
//                     title: 'Line Chart',
//                     data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]],
//                     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//                     series: ['Series A', 'Series B'],
//                     options: { legend: { display: true } }
//                 },

//             ];
//         });




myApp.controller('myController', function ($scope, $location) {

 
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
        // event.preventDefault(); 
       
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
            $location.path('/dashboard');  
        }
         else {
            alert('Incorrect username or password.');
        }
    };
});

  //can use window method to redirect by
  //  $window.location.href = 'Dashboard.html';

     // $scope.redirect = function(){
      
    //     var url = "https://http://127.0.0.1:5500/directory.html";
    //     $window.location.href = url;
    //   }
    

    // $scope.dummyTiles = [
    //     { title: 'Tile 1', content: 'Content for Tile 1' },
    //     { title: 'Tile 2', content: 'Content for Tile 2' },
    //     { title: 'Tile 3', content: 'Content for Tile 3' }

    // ];

    // var chrt = document.getElementById("chartId").getContext("2d");

    //   $scope.chartId = new Chart(chrt, {
    //      type: 'radar',
    //      data: {
    //         labels: ['January', 'February', 'March', 'April'],
    //         datasets: [{
    //            label: "online tutorial subjects",
    //            data: [20, 40, 33, 35],
    //            backgroundColor: ['lightgrey'],
    //            pointBackgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold'],
    //            borderColor: ['black'],
    //            borderWidth: 1,
    //            pointRadius: 6,
    //         }],
    //      },
    //      options: {
    //         responsive: false,
    //         elements: {
    //            line: {
    //               borderWidth: 3
    //            }
    //         }
    //      },
    //   });