import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'
import { Brand } from '../model/brands.model';
import { FormControl } from '@angular/forms';

@Injectable()
export class FilterService {
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
      tap(brands => this.brand$.next(brands.brandNames))
    )
    .subscribe()
  }

  buildModelControl(): FormControl {
    const brand = new FormControl()
    // brand.valueChanges
    // .pipe(
    //   debounceTime(500),
    //   distinctUntilChanged()
        
    // )
    // .subscribe()
    return brand;
  }
}
