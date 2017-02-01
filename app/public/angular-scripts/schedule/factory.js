(() => {
    const factories = angular.module("ScheduleFactories", ["ScheduleServices"]);

    factories.factory("Schedule", ["ScheduleService", (scheduleService) => {
        const Schedule = () => {

        }

        const createAttributes = {
            "name": "",
            "description": "",
            "type": "Weekly",
            "attributes": {
                "data": []
            },
            "created_by": "",
            "exclude_weekends": false
        };

        const editAttributes = {
            "_id": "",
            "name": "",
            "description": "",
            "type": "",
            "attributes": {
                "data": []
            },
            "created_by": "",
            "exclude_weekends": false
        };

        const weeklyColumns = [
            "Day",
            "Shift Start",
            "Shift End",
            "Hours Flexible",
            "Shift",
        ];

        const monthlyColumns = [
            "Date",
            "Day",
            "Shift Start",
            "Shift End",
            "Hours Flexible",
            "Shift",
        ];

        Schedule.getCreateForm = () => {
            return createAttributes;
        };

        Schedule.getEditForm = () => {
            return editAttributes;
        };

        Schedule.getWeeklyColumns = () => {
            return weeklyColumns;
        };

        Schedule.getMonthlyColumns = () => {
            return monthlyColumns;
        };

        Schedule.create = (details) => {
            return scheduleService.create(details);
        };

        Schedule.edit = (details) => {
            return scheduleService.edit(details);
        };

        Schedule.getById = (id) => {
            return scheduleService.getById(id);
        };

        Schedule.allSchedules = () => {
            return scheduleService.allSchedules();
        };

        return Schedule;
    }]);
})();
