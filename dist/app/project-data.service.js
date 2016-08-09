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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var ProjectDataService = (function () {
    function ProjectDataService(http) {
        this.http = http;
        this.url = 'https://www.phonetik.uni-muenchen.de/devel/emuDB-manager/server-side/emudb-manager.php';
        this.createHotObservable();
    }
    ProjectDataService.prototype.createHotObservable = function () {
        var _this = this;
        this.infoObservable = Rx_1.Observable.create(function (observer) {
            _this.infoObserver = observer;
        }).publishReplay(1);
        this.infoObservable.connect();
    };
    ProjectDataService.prototype.fetchData = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('query', 'project_info');
        this.serverQuery(params).subscribe(function (next) {
            if (next.success === true) {
                _this.infoObserver.next(next.data);
            }
            else {
                if (next.data === 'BAD_LOGIN') {
                    _this.infoObserver.error('BAD_LOGIN');
                    _this.createHotObservable();
                }
                else {
                    _this.infoObserver.error('UNKNOWN ERROR');
                }
            }
        });
    };
    ProjectDataService.prototype.serverQuery = function (params) {
        console.log('Querying server', params);
        params.set('user', this.username);
        params.set('password', this.password);
        return this.http
            .get(this.url, { search: params })
            .map(function (response) {
            var json = response.json();
            console.log('Received JSON data', json);
            return json;
        })
            .catch(function (error) {
            return Rx_1.Observable.throw('Error during download', error);
        });
    };
    ProjectDataService.prototype.login = function (username, password) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.username = username;
            _this.password = password;
            var params = new http_1.URLSearchParams();
            params.set('query', 'login');
            _this.serverQuery(params).subscribe(function (next) {
                if (next.success === true) {
                    observer.next(null);
                    observer.complete();
                    _this.fetchData();
                }
                else {
                    observer.error(next);
                }
            });
        });
    };
    ProjectDataService.prototype.logout = function () {
        this.createHotObservable();
    };
    ProjectDataService.prototype.getAllDatabases = function () {
        return this.infoObservable.map(function (x) {
            return x.databases;
        });
    };
    ProjectDataService.prototype.getAllBundleLists = function () {
        return this.infoObservable.map(function (x) {
            var result = [];
            for (var i = 0; i < x.databases.length; ++i) {
                result = result.concat(x.databases[i].bundleLists);
            }
            return result;
        });
    };
    ProjectDataService.prototype.getBundleList = function (database, name, status) {
        return this.infoObservable.map(function (x) {
            for (var i = 0; i < x.databases.length; ++i) {
                if (x.databases[i].name === database) {
                    for (var j = 0; j < x.databases[i].bundleLists.length; ++j) {
                        if (x.databases[i].bundleLists[j].name === name
                            && x.databases[i].bundleLists[j].status === status) {
                            return x.databases[i].bundleLists[j];
                        }
                    }
                }
            }
            return null;
        });
    };
    /**
     * Returns the info object for a single database
     *
     * @param name The name of the database in question
     * @returns A DatabaseInfo object if the DB exists, otherwise null
     */
    ProjectDataService.prototype.getDatabase = function (name) {
        return this.infoObservable.map(function (x) {
            for (var i = 0; i < x.databases.length; ++i) {
                if (x.databases[i].name === name) {
                    return x.databases[i];
                }
            }
            return null;
        });
    };
    ProjectDataService.prototype.getName = function () {
        return this.infoObservable.map(function (x) {
            return x.name;
        });
    };
    ProjectDataService.prototype.getAllUploads = function () {
        return this.infoObservable.map(function (x) {
            return x.uploads;
        });
    };
    ProjectDataService.prototype.getUpload = function (uuid) {
        return this.infoObservable.map(function (x) {
            for (var i = 0; i < x.uploads.length; ++i) {
                if (x.uploads[i].uuid === uuid) {
                    return x.uploads[i];
                }
            }
            return null;
        });
    };
    ProjectDataService.prototype.countBundles = function (sessions) {
        var result = 0;
        for (var i = 0; i < sessions.length; ++i) {
            result += sessions[i].bundles.length;
        }
        return result;
    };
    ProjectDataService.prototype.renameDatabase = function (oldName, newName) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var params = new http_1.URLSearchParams();
            params.set('query', 'rename_db');
            params.set('old_name', oldName);
            params.set('new_name', newName);
            _this.serverQuery(params).subscribe(function (next) {
                if (next.success === true) {
                    observer.next(null);
                    observer.complete();
                }
                else {
                    observer.error(next);
                }
            });
        });
    };
    ProjectDataService.prototype.editBundle = function (database, name, status, newName, newStatus) {
        return Rx_1.Observable.create(function (observer) {
            observer.error({ success: false, message: 'jippie', data: 'JIPII' });
        });
    };
    ProjectDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectDataService);
    return ProjectDataService;
}());
exports.ProjectDataService = ProjectDataService;
//# sourceMappingURL=project-data.service.js.map