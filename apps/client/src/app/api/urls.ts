const getBaseUrl = () => `http://localhost:3000`;
const getApiBaseUrl = () => `${getBaseUrl()}/api`;

export const getBTCTrackerBaseUrl = () => `${getBaseUrl()}/btc-tracker`;
export const getAccountsBaseUrl = () => `${getApiBaseUrl()}/accounts`;
export const getTransactionBaseUrl = () => `${getApiBaseUrl()}/transactions`;

export const getAccountsUrl = () => `${getAccountsBaseUrl()}`;
export const getAccountUrlById = (id: string) => `${getAccountsBaseUrl()}/${id}`;

export const getTransactionsUrl = () => `${getTransactionBaseUrl()}`;
export const getTransactionsUrlById = (id: string) => `${getTransactionBaseUrl()}/${id}`;
export const getTransactionsUrlByAccountId = (account_id: string) => `${getTransactionBaseUrl()}/account_id/${account_id}`;