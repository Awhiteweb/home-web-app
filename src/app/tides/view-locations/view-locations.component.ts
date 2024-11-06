import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Store} from "@ngxs/store";
import {createPopper} from "@popperjs/core";
import {BehaviorSubject, Observable, combineLatest} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {SetTidesLocation} from "../state/tides.actions";
import {TidesState} from "../state/tides.state";
import {TideLocations} from "../tides.entites";

@Component({
    selector: 'app-tides-locations',
    templateUrl: './view-locations.component.html'
})
export class ViewLocationsComponent implements OnInit {

    dropdownPopoverShow = false;
    private filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

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

    locationList$: Observable<TideLocations>;
    filteredLocations$!: Observable<TideLocations>;

    constructor(private store: Store) {
        this.locationList$ = store.select(TidesState.locations);
     }

    ngOnInit() {
        this.filteredLocations$ = combineLatest([this.filter$, this.locationList$]).pipe(
            map(([filter, locationList]) => {
                if(filter == null || filter.length < 1) {
                    return locationList;
                }
                return locationList.filter(location => location.name.toLocaleLowerCase().indexOf(filter) > -1)
            }),
            debounceTime(200)
        );
    }
    
    changeLocation(locationId: string): void {
        this.store.dispatch(new SetTidesLocation(locationId));
    }

    applyFilter(arg: string) {
        this.filter$.next(arg.toLowerCase());
    }
}