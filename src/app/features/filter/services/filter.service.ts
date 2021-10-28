import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { Brand } from '../model/brands.model';
import { FormControl } from '@angular/forms';
import { Model } from '../model/models.model';

@Injectable()
export class FilterService {
  fullBrand$ = new BehaviorSubject<Brand[]>([]);
  sellingType$ = new BehaviorSubject(['Sell', 'Rent']);
  brand$ = new BehaviorSubject<string[]>(['Loading']);
  model$ = new BehaviorSubject(['Loading']);
  category$ = new BehaviorSubject(['Loading']);

  state$ = combineLatest([
    this.sellingType$,
    this.brand$,
    this.model$,
    this.category$
  ])


  constructor(private http: HttpClient) { 
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
}
