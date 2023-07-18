export class CreateTransactionDto {
    readonly account_id: string;
    readonly order_code: string;
    readonly transaction_type: string;
    readonly debit: string;
    readonly credit: number;
    readonly balance: number;
    readonly created_at: Date;
}
