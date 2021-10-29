import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { Brand } from '../model/brands.model';
import { FormControl } from '@angular/forms';
import { Model } from '../model/models.model';
import { Category } from '../model/category.model';

@Injectable()
export class FilterService {
  
  fullBrand$ = new BehaviorSubject<Brand[]>([]);
  sellingType$ = new BehaviorSubject(['Sell', 'Rent']);
  brand$ = new BehaviorSubject<string[]>(['Loading']);
  model$ = new BehaviorSubject<string[]>(['Loading']);
  category$ = new BehaviorSubject<string[]>(['Loading']);
  years$ = new BehaviorSubject<string[]>([]);
  engineSizes$ = new BehaviorSubject<string[]>([])
  transmission$ = new BehaviorSubject<string[]>([]);
  fuelType$ = new BehaviorSubject<string[]>([]);
  uploadDate$ = new BehaviorSubject<string[]>([]);
  custom$ = new BehaviorSubject<string[]>([]);
  wheel$ = new BehaviorSubject<string[]>([]);
  location$ = new BehaviorSubject<string[]>([]);


  state$ = combineLatest([
    this.sellingType$,
    this.brand$,
    this.model$,
    this.category$,
    this.years$,
    this.engineSizes$,
    this.transmission$,
    this.fuelType$,
    this.uploadDate$,
    this.custom$,
    this.wheel$,
    this.location$
  ])

  constructor(private http: HttpClient) { 
    this.initialEngineSize();
    this.initialTransmission();
    this.initialFuel();
    this.initialUpload();
    this.initialCustom();
    this.initialWheel();
    this.initialLocation();
    this.initialYear();
    // fetching brands
    this.http.get<Brand[]>(environment.api.brands)
    .pipe(
      map(brands => {
        const brandNames = brands.map(brand => brand.brand);
        return {
          brandNames,
          fullBrand: brands
        }
      }),
      tap(brands => { 
        this.brand$.next(brands.brandNames)
        this.fullBrand$.next(brands.fullBrand)
       })
    )
    .subscribe();

    // fetching categories
    this.http.get<Category[]>(environment.api.category)
    .pipe(
      map(cats => cats.map(cat => cat.type)),
      tap(cat => this.category$.next(cat))
    )
    .subscribe()
  }

  buildModelControl(): FormControl {
    const brand = new FormControl()
    brand.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(brand => this.fullBrand$
          .pipe(
            map(brands => brands.filter(e => e.brand === brand)[0].id),
            switchMap(id => {
              if(id){
                return this.http.get<Model[]>(environment.api.model + id)
              }
              return from([])
            })
          )
        ),
      map(models => {
        const modelNames = models.map(model => model.model)
        return {
          modelNames,
          fullModel: models
        }
      }),
      tap(obj => this.model$.next(obj.modelNames))
    )
    .subscribe()
    return brand;
  }

  buildSearchTermControl(): FormControl {
    const searchTerm = new FormControl();
    searchTerm.valueChanges
    .pipe(
      tap(e => console.log(e))
    )
    .subscribe()

    return searchTerm;
  }

  initialYear() {
    const currDate = new Date;
    const currYear = currDate.getFullYear();
    const tempArr: string[] = [];
    for(let i = currYear - 100; i <= currYear; i++){
      tempArr.push(i.toString());
    }
    tempArr.sort((a,b) => +b - +a);
    this.years$.next(tempArr);
  }

  initialEngineSize() {
    const decimalsArr = [];
    for(let i = 0.1; i < 13; i+=.1) {
      decimalsArr.push(i.toFixed(1));
    }
   this.engineSizes$.next(decimalsArr);
  }

  initialTransmission() {
    const transmissions = [
      'Manual',
      'Automatic',
      'Tiptronic',
      'CVT'
    ]
    this.transmission$.next(transmissions);
  }

  initialFuel(){
    const fuelTypes = [
      'Gas',
      'Diesel',
      'Electric',
      'Hybrid',
      'Plugin hybrid',
      'Air'
    ]
    this.fuelType$.next(fuelTypes);
  }

  initialUpload() {
    const uploads = [
      'Last hour',
      'Past week',
      'Past month'
    ]
    this.uploadDate$.next(uploads);
  }

  initialCustom() {
    const customs = ['Custom cleared', 'Before customs'];
    this.custom$.next(customs);
  }

  initialWheel() {
    const wheelSides = ['Left wheel', 'Right-hand wheel'];
    this.wheel$.next(wheelSides);
  }

  initialLocation() {
    const locations = ['USA', 'Europe', 'Georgia'];
    this.location$.next(locations);
  }
}
