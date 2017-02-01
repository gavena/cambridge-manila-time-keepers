(() => {
    const factories = angular.module("ShiftFactories", ["ShiftServices"]);

    factories.factory("Shift", ["ShiftService", (shiftService) => {
        const Shift = () => {

        }

        const createAttributes = {
            "name": "",
            "description": "",
            "start": "",
            "end": "",
            "hours_flex": "",
            "created_by": ""
        };

        const editAttributes = {
            "_id": "",
            "name": "",
            "description": "",
            "start": "",
            "end": "",
            "hours_flex": "",
            "created_by": ""
        };

        Shift.getCreateForm = () => {
            return createAttributes;
        };

        Shift.getEditForm = () => {
            return editAttributes;
        };

        Shift.create = (details) => {
            return shiftService.create(details);
        };

        Shift.edit = (details) => {
            return shiftService.edit(details);
        };

        Shift.getById = (id) => {
            return shiftService.getById(id);
        };

        Shift.allShifts = () => {
            return shiftService.allShifts();
        };

        return Shift;
    }]);
})();
