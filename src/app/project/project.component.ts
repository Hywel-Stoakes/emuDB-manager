import {Component, OnInit, OnDestroy} from "@angular/core";
import {DatabaseInfo} from "../types/database-info";
import {BundleList} from "../types/bundle-list";
import {ProjectDataService} from "../project-data.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {UploadInfo} from "../types/upload-info";

@Component({
	moduleId: module.id,
	selector: 'emudbmanager-project',
	templateUrl: 'project.component.html',
	styleUrls: ['project.component.css']
})
export class ProjectComponent implements OnInit,OnDestroy {
	private bundleLists:BundleList[] = [];
	private databases:DatabaseInfo[] = [];
	private subBundleLists:Subscription;
	private subDatabases:Subscription;
	private subUploads:Subscription;
	private uploads:UploadInfo[] = [];

	constructor(private projectDataService:ProjectDataService,
	            private router:Router) {
	}

	ngOnInit():any {
		this.subBundleLists = this.projectDataService.getAllBundleLists().subscribe(next => {
			this.bundleLists = next;
		});
		this.subDatabases = this.projectDataService.getAllDatabases().subscribe(next => {
			this.databases = next;
		});
		this.subUploads = this.projectDataService.getAllUploads().subscribe(next => {
			this.uploads = next;
		});
	}

	ngOnDestroy():any {
		if (this.subBundleLists) {
			this.subBundleLists.unsubscribe();
		}
		if (this.subDatabases) {
			this.subDatabases.unsubscribe();
		}
		if (this.subUploads) {
			this.subUploads.unsubscribe();
		}
	}

	private logout():void {
		this.projectDataService.logout();
		this.router.navigate(['/project']);
	}
}