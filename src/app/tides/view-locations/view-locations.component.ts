import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {createPopper} from "@popperjs/core";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {TideLocations} from "../tides.entites";
import {TideStates} from "../tides.state";

@Component({
    selector: 'app-tides-locations',
    templateUrl: './view-locations.component.html'
})
export class ViewLocationsComponent implements OnInit {

    dropdownPopoverShow = false;

    @ViewChild("btnDropdownRef", {static: false})
    btnDropdownRef!: ElementRef;
    @ViewChild("popoverDropdownRef", {static: false})
    popoverDropdownRef!: ElementRef;

    toggleDropdown(event: any) {
        event.preventDefault();
        if(this.dropdownPopoverShow) {
            this.dropdownPopoverShow = false;
        } else {
            this.dropdownPopoverShow = true;
            this.createPoppper();
        }
    }

    createPoppper() {
        createPopper(
            this.btnDropdownRef.nativeElement,
            this.popoverDropdownRef.nativeElement,
            {
                placement: "bottom-start",
            }
        );
    }

    locationList$!: Observable<TideLocations>;

    constructor(private tidesState: TideStates) { }

    ngOnInit() {
        this.locationList$ = this.tidesState.getLocations$.pipe(
            map((x) => x.sort((a, b) => a.name > b.name ? 1 : -1)),
            tap((x) => console.log(`locations: ${x.length}`)));
    }

    viewLocationTides(locationId: string): void {
        this.tidesState.setLocation(locationId);
    }
}