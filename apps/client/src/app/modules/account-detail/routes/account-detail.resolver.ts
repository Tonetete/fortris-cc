import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Transaction } from "@fortris-cc/types";

import { AccountService } from "../../../services/account.service";

@Injectable({ providedIn: 'root' })
export class AccountDetailResolver {

    constructor(private accountService: AccountService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Transaction[]> {
        return this.accountService.fetchTransactionsByAccountId$(route.params['id']);
    }
}