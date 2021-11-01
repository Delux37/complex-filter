import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { Brand } from '../model/brands.model';
import { FormControl } from '@angular/forms';
import { Model } from '../model/models.model';
import { Category } from '../model/category.model';

let _state = {
  sellingType: ['Sell', 'Rent'],
  brand: [],
  model: [],
  category: [],
  years: [],
  engineSizes: [],
  transmission: [
    'Manual',
    'Automatic',
    'Tiptronic',
    'CVT'
  ],
  fuelType: [
    'Gas',
    'Diesel',
    'Electric',
    'Hybrid',
    'Plugin hybrid',
    'Air'
  ],
  uploadDate: ['Last hour','Past week','Past month'],
  custom: ['Custom cleared', 'Before customs'],
  wheel: ['Left wheel', 'Right-hand wheel'],
  location: ['USA', 'Europe', 'Georgia']
}

@Injectable()
export class FilterService {
  private $store = new BehaviorSubject(_state);
  public state$ = this.$store.asObservable();

  fullBrand$ = new BehaviorSubject<Brand[]>([]);

  sellingType$ = this.state$.pipe(map(state => state.sellingType),  distinctUntilChanged());
  brand$ = this.state$.pipe(map(state => state.brand), distinctUntilChanged());
  model$ = this.state$.pipe(map(state => state.model), distinctUntilChanged());
  category$ = this.state$.pipe(map(state => state.category), distinctUntilChanged());
  years$ = this.state$.pipe(map(state => state.years), distinctUntilChanged());
  engineSizes$ = this.state$.pipe(map(state => state.engineSizes), distinctUntilChanged());
  transmission$ = this.state$.pipe(map(state => state.transmission), distinctUntilChanged());
  fuelType$ = this.state$.pipe(map(state => state.fuelType), distinctUntilChanged());
  uploadDate$ = this.state$.pipe(map(state => state.uploadDate), distinctUntilChanged());
  custom$ = this.state$.pipe(map(state => state.custom), distinctUntilChanged());
  wheel$ = this.state$.pipe(map(state => state.wheel), distinctUntilChanged());
  location$ = this.state$.pipe(map(state => state.location), distinctUntilChanged());


  vm$: Observable<any> = combineLatest([
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
  ]).pipe(
      map(([sellingType, brand,model,category, years,engineSizes,transmission, fuelType,uploadDate,custom,wheel,location]) => {
        return {
          sellingType, 
          brand,
          model,
          category,
          years,
          engineSizes,
          transmission,
           fuelType,
           uploadDate,
           custom,
           wheel,
           location
        }
      })
    )

  constructor(private http: HttpClient) { 
    this.initialEngineSize();
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
        // this.brand$.next(brands.brandNames)
        this.updateState({
          ..._state, brand: brands.brandNames
        });
        this.fullBrand$.next(brands.fullBrand)
       })
    )
    .subscribe();

    // fetching categories
    this.http.get<Category[]>(environment.api.category)
    .pipe(
      map(cats => cats.map(cat => cat.type)),
      tap(category => this.updateState({..._state, category}))
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
      tap(obj =>this.updateState({..._state, model: obj.modelNames }))
    )
    .subscribe()
    return brand;
  }

  buildSearchTermControl(): FormControl {
    const searchTerm = new FormControl();
    searchTerm.valueChanges
    .pipe()
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
    this.updateState({
      ..._state, years: tempArr
    });
  }

  initialEngineSize() {
    const decimalsArr = [];
    for(let i = 0.1; i < 13; i+=.1) {
      decimalsArr.push(i.toFixed(1));
    }
   this.updateState({
     ..._state, engineSizes: decimalsArr
   });
  }

  private updateState(state: any) {
    this.$store.next(_state = state);
  }
}
