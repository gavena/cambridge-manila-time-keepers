(() => {
  "use strict";
    const factories = angular.module("TimeFactories", []);

    factories.factory("Time", [() => {
        const Time = () => {

        }

        Time.toTime = (timeString) => {
            let d = new Date(timeString);
            return new Date(1970, 0, 1, d.getHours(), d.getMinutes(), d.getSeconds());
        };

        Time.getHours = (timeString) => {
          let d = new Date(timeString);
          return d.getHours();
        };

        Time.getMinutes = (timeString) => {
          let d = new Date(timeString);
          return d.getMinutes();
        };

        return Time;
    }]);
})();
