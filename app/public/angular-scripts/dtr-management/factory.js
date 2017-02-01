(() => {
  "use strict";
    const factories = angular.module("DtrManagementFactories", ["DtrManagementServices"]);

    factories.factory("DtrManagement", ["DtrManagementService", (dtrManagementService) => {
          const dtrHeaders = [
              "Day",
              "Arrival",
              "Departure",
              "Hours",
              "Minutes",
              "Leave",
              "Quantity",
              "Remarks"
          ];

          const editDtrHeaders = [
              "Day",
              "Arrival",
              "Departure",
              "Hours",
              "Minutes",
              "Leave",
              "Quantity",
              "Remarks"
          ];


          const editAttributes = {
              "_id": "",
              "month": "",
              "year": "",
              "username": "",
              "description": "",
              "attributes": {
                  "data": []
              }
          };

          function DtrManagement() {

          }

          DtrManagement.getDtrHeaders = () => {
              return dtrHeaders;
          };

          DtrManagement.getEditDtrHeaders = () => {
              return editDtrHeaders;
          };

          DtrManagement.getEditForm = () => {
              return editAttributes;
          };

          DtrManagement.getByDtr = (data) => {
              return dtrManagementService.getByDtr(data);
          };

          DtrManagement.edit = (data) => {
              return dtrManagementService.edit(data);
          };

          DtrManagement.approve = (data) => {
              return dtrManagementService.approve(data);
          };

          DtrManagement.return = (data) => {
              return dtrManagementService.return(data);
          };

          DtrManagement.getApprovedDtrByMonthAndYear = (data) => {
              return dtrManagementService.getApprovedDtrByMonthAndYear(data);
          };

          DtrManagement.getEditableDtr = (data) => {
            return dtrManagementService.getEditableDtr(data);
          }
          return DtrManagement;
    }]);
})();
