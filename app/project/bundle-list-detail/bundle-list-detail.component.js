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
var router_1 = require("@angular/router");
var project_data_service_1 = require("../../project-data.service");
var BundleListDetailComponent = (function () {
    function BundleListDetailComponent(projectDataService, route) {
        this.projectDataService = projectDataService;
        this.route = route;
        this.allBundles = [];
        this.commentedBundles = [];
        this.database = '';
        this.infoEditor = {
            isEditing: false,
            messageError: '',
            messageSuccess: '',
            newName: '',
            newStatus: ''
        };
        this.state = 'Info';
    }
    BundleListDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subParams = this.route.params.subscribe(function (nextParams) {
            if (typeof nextParams['status'] === 'undefined') {
                nextParams['status'] = '';
            }
            _this.subBundleList = _this.projectDataService.getBundleList(nextParams['database'], nextParams['name'], nextParams['status']).subscribe(function (nextBundleList) {
                _this.database = nextParams['database'];
                _this.bundleList = nextBundleList;
                _this.infoEditor.newName = nextBundleList.name;
                _this.infoEditor.newStatus = nextBundleList.status;
                _this.allBundles = nextBundleList.items;
                _this.commentedBundles = nextBundleList.items.filter(function (element) {
                    return element.comment !== '';
                });
            });
        });
    };
    BundleListDetailComponent.prototype.ngOnDestroy = function () {
        if (this.subParams) {
            this.subParams.unsubscribe();
        }
    };
    BundleListDetailComponent.prototype.submitNewInfo = function () {
        var _this = this;
        var newName = this.infoEditor.newName;
        var newStatus = this.infoEditor.newStatus;
        this.toggleEditInfo();
        this.infoEditor.messageError = '';
        this.infoEditor.messageSuccess = '';
        this.projectDataService.editBundle(this.database, this.bundleList.name, this.bundleList.status, newName, newStatus).subscribe(function (next) {
            _this.infoEditor.messageSuccess = 'Successfully edited.';
            _this.projectDataService.fetchData();
            if (_this.subBundleList) {
                _this.subBundleList.unsubscribe();
            }
            _this.subBundleList = _this.projectDataService.getBundleList(_this.database, _this.infoEditor.newName, _this.infoEditor.newStatus).subscribe(function (nextBundleList) {
                _this.bundleList = nextBundleList;
                _this.infoEditor.newName = nextBundleList.name;
                _this.infoEditor.newStatus = nextBundleList.status;
                _this.allBundles = nextBundleList.items;
                _this.commentedBundles = nextBundleList.items.filter(function (element) {
                    return element.comment !== '';
                });
            });
        }, function (error) {
            _this.infoEditor.messageError = error.message;
        });
    };
    BundleListDetailComponent.prototype.toggleEditInfo = function () {
        if (this.infoEditor.isEditing) {
            this.infoEditor.newName = this.bundleList.name;
            this.infoEditor.newStatus = this.bundleList.status;
            this.infoEditor.isEditing = false;
        }
        else {
            this.infoEditor.isEditing = true;
        }
    };
    BundleListDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'emudbmanager-bundle-list-detail',
            templateUrl: 'bundle-list-detail.component.html',
            styleUrls: ['bundle-list-detail.component.css']
        }), 
        __metadata('design:paramtypes', [project_data_service_1.ProjectDataService, router_1.ActivatedRoute])
    ], BundleListDetailComponent);
    return BundleListDetailComponent;
}());
exports.BundleListDetailComponent = BundleListDetailComponent;
//# sourceMappingURL=bundle-list-detail.component.js.map