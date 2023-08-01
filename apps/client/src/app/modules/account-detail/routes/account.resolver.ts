import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Account } from "@fortris-cc/types";
import { Observable } from "rxjs";
import { AccountService } from "../../../services/account.service";

@Injectable({ providedIn: 'root' })
export class AccountResolver {

    constructor(private accountService: AccountService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Account> {
        return this.accountService.fetchAccountById$(route.params['id']);
    }
}