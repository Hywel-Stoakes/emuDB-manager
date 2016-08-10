"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var databases_overview_component_1 = require("../databases-overview/databases-overview.component");
var project_data_service_1 = require("../../project-data.service");
var DatabaseDashboardComponent = (function () {
    function DatabaseDashboardComponent(projectDataService) {
        this.projectDataService = projectDataService;
        this.databases = [];
    }
    DatabaseDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.projectDataService.getAllDatabases().subscribe(function (then) {
            _this.databases = then;
        });
    };
    DatabaseDashboardComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    DatabaseDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'emudbmanager-database-dashboard',
            templateUrl: 'database-dashboard.component.html',
            styleUrls: ['database-dashboard.component.css'],
            directives: [databases_overview_component_1.DatabasesOverviewComponent]
        }), 
        __metadata('design:paramtypes', [project_data_service_1.ProjectDataService])
    ], DatabaseDashboardComponent);
    return DatabaseDashboardComponent;
}());
exports.DatabaseDashboardComponent = DatabaseDashboardComponent;
//# sourceMappingURL=../../../tmp/broccoli_type_script_compiler-input_base_path-7gBrH8uH.tmp/0/src/app/project/database-dashboard/database-dashboard.component.js.map