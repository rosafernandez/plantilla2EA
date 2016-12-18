angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.message =  'Mínim IONIC - EA - Rosa Fernandez';

}])

.controller('estudiantsCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
  $scope.newEstudiant = {};

  // Obtenemos todos los estudiantes
  $http.get('http://localhost:8080/api/estudiant')
    .success(function(data) {
      $scope.estudiants = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para eliminar estudiante
  $scope.deleteEstudiant = function(id) {
    $http.delete('http://localhost:8080/api/estudiant/' + id)
      .success(function(data) {
        $scope.newEstudiant = {};
        $scope.estudiants = data;
        $scope.selected = false;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  // Función para registrar estudiante
  $scope.registrarPersona = function() {
    $http.post('http://localhost:8080/api/estudiant', $scope.newEstudiant)
      .success(function(data) {
        $scope.newEstudiant = {}; // Borramos los datos del formulario
        $scope.estudiants = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}])

.controller('assignaturesCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {    $scope.newAssignatura = {};

// Obtenemos todos los datos de la base de datos
  $http.get('http://localhost:8080/api/assignatura').success(function(data) {
    $scope.assignatures = data;
    console.log($scope.assignatures);
  })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para añadir asignatura
  $scope.addAssignatura = function() {
    $http.post('http://localhost:8080/api/assignatura', $scope.newAssignatura)
      .success(function(data) {
        $scope.newAssignatura = {}; // Borramos los datos del formulario
        $scope.assignatures = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Función para eliminar asignatura
  $scope.deleteAssignatura = function(id) {
    $http.delete('http://localhost:8080/api/assignatura/' + id)
      .success(function(data) {
        $scope.newAssignatura = {};
        $scope.assignatures = data;
        $scope.selected = false;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Función para coger el Assignatura seleccionado en la tabla
  $scope.selectAssignatura = function(assignatura) {
    $scope.estudiantsList = {};
    $scope.table1 = true;
    $scope.selectedAssignatura = assignatura;
    $scope.selected = true;
    console.log($scope.selectedAssignatura);
    var listestudiants = [];

    angular.forEach($scope.selectedAssignatura.estudiants, function(estudiant, key) {

      console.log("Alumnes inscrits en", $scope.selectedAssignatura.nom, ":", estudiant);

      $http.get('http://localhost:8080/api/estudiant/' + estudiant)
        .success(function(data) {
          $scope.estudiant = data;
          console.log($scope.estudiant.nom);
          listestudiants.push($scope.estudiant.nom); //Añade nombre estudiante dentro de lista
          $scope.estudiantsList = listestudiants;
          console.log("Noms dels alumnos en", $scope.selectedAssignatura.nom, ":", $scope.estudiantsList);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    });


  };
  // Función para coger el Estudiant seleccionado en la tabla
  $scope.selectEstudiant = function(estudiants) {
    $scope.table2 = true;
    $scope.selectedEstudiant = estudiants;
    $scope.selected = true;
    console.log($scope.selectedEstudiant);

    $http.get('http://localhost:8080/api/estudiant/' + $scope.selectedEstudiant)
      .success(function(data) {
        $scope.estudiants = data;
        console.log($scope.estudiants);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


  };
  $scope.newEstudiant ={};
  // Función para añadir alumno a asignatura
  $scope.addEstudiant = function() {
    console.log($scope.selectedAssignatura._id);
    console.log($scope.newEstudiant);
    $http.post('http://localhost:8080/api/assignatura/' + $scope.selectedAssignatura._id, $scope.newEstudiant)
      .success(function(data) {
        $scope.selectedAssignatura = data;
        location.reload();

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
  .controller('modificarEstudiantCtrl', ['$scope', '$stateParams', '$http', '$state', function ($scope, $stateParams, $http, $state) {

    //Función para obtener un estudiante y luego modificarlo con la siguiente funcion
      $http.get('http://localhost:8080/api/estudiant/' + $stateParams.id)
        .success(function(data) {
          $scope.modEstudiant = data;
          console.log(data);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

    // Función para editar los datos de una persona
    $scope.modificarPersona = function(newPersona) {
      $http.put('http://localhost:8080/api/estudiant/' + $stateParams.id, $scope.modEstudiant)
          .success(function(data) {
          $scope.newPersona = {}; // Borramos los datos del formulario
          $scope.persones = data;
          $scope.selected = false;
            $state.go('menu.estudiants');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    }])
  .controller('filtrCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {
      $http.get('http://localhost:8080/api/assignatura').success(function(data) {
        $scope.assignatures = data;
        console.log($scope.assignatures);
      })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      $scope.getAssignaturesFiltrades = function(filtre) {
        if(filtre == undefined)
        {
          return;
        }
        if(filtre.nom == "")
          filtre.nom = undefined;
        if(filtre.periode == "")
          filtre.periode = undefined;

        $http.get('http://localhost:8080/api/assignatura', {
          params: filtre
        }).success(function(data) {
          $scope.assignatures = data;
        }).error(function (data) {
          console.log("Error en getAssignaturesFiltrades "+data);
        });
        filter = undefined;

      }

    }])
