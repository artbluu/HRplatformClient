import {HttpParams} from '@angular/common/http';


export function serialize(obj: any): HttpParams {
  let params = new HttpParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !looseInvalid(obj[key])) {
      params = params.set(key, obj[key]);
    }
  }

  return params;
}
function looseInvalid(a: string | number): boolean {
    return a === '' || a === null || a === undefined;
  }