import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from './models/season';
import { MatchDTO } from './models/match-dto';

@Injectable({
    providedIn: 'root'
})
export class LiigaGatewayService {

    constructor(private _http: HttpClient) { }

    public fetchMatches(season: Season): Observable<MatchDTO[]> {
        return this._http.get<MatchDTO[]>(`https://liiga.fi/api/v1/games?tournament=runkosarja&season=${season}`);
    }
}
