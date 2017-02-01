(() => {
    const factories = angular.module("DtrOptionsFactories", []);

    factories.factory("DtrOptions", [() => {
        const leaveTypes = [
            "Business",
            "Christmas",
            "Emergency",
            "Holiday",
            "Official Travel",
            "Offsetting",
            "Philippines Annual",
            "Philippines Sick",
            "Philippines Service Incentive Leave",
            "Training",
        ];

        const tardinessTypes = [
            "Tardiness Incurred",
            "Minutes Tardy",
            "AWOL"
        ];

        const DtrOptions = () => {

        }

        DtrOptions.getLeaveTypes = () => {
            return leaveTypes;
        };

        DtrOptions.getTardinessTypes = () => {
            return tardinessTypes;
        };

        return DtrOptions;
    }]);
})();
