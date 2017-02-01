(() => {
    const factories = angular.module("TeamFactories", ["TeamServices"]);

    factories.factory("Team", ["TeamService", (teamService) => {
        const Team = () => {

        }
          console.log("username Factory=");

        Team.allTeamMembers = (username) => {
          console.log("username Factory allTeamMembers="+username);
            return teamService.allTeamsMembers(username);
        };

        return Team;
    }]);
})();
