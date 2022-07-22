import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FixtureDTO } from './models/fixture-dto';
import { Season } from './models/season';

@Injectable({
    providedIn: 'root'
})
export class LiigaGatewayService {

    constructor(private _http: HttpClient) { }

    public fetchSchedule(season: Season): Observable<FixtureDTO[]> {
        return this._http.get<FixtureDTO[]>(`https://www.liiga.fi/api/v1/schedule/${season}/runkosarja`);
    }
}
