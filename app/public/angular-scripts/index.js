angular.module("AngularMaterial", [
        "ShiftModule",
        "ScheduleModule",
        "CreateShiftModule",
        "DtrManagementModule",
        "EditShiftModule",
        "CreateScheduleModule",
        "EditScheduleModule",
        "ViewScheduleModule",
        "EditDtrManagementModule",
        "UserModule",
        "CreateUserModule",
        "TeamModule",
       "LoginUserModule",
        "ToolbarModule",
        "ReportModule",
        "EmployeeModule",
        "EmployeeDtrModule",
        "AdminModule",
        "DashboardModule",
        "ngMaterial",
        "ngMessages",
        "md.data.table",
        "angular-bind-html-compile",
        "angularMoment"
    ])
    .config(($mdThemingProvider, $interpolateProvider, $mdIconProvider) => {
        $interpolateProvider.startSymbol("<%");
        $interpolateProvider.endSymbol("%>");

        const oceanMap = $mdThemingProvider.extendPalette("grey", {
            "500": "#0077B3",
            "contrastDefaultColor": "light"
        });

        $mdThemingProvider.definePalette("ocean", oceanMap);
        $mdThemingProvider.theme("default")
            .primaryPalette("ocean")
            .accentPalette("blue");
    });

