export class CreateAccountsDto {
    readonly account_name: string;
    readonly tag: string;
    readonly category: string;
    readonly balance: number;
    readonly available_balance: number;
    readonly created_at: Date;
    readonly updated_at: Date;
}
