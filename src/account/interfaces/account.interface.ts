export interface Account {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    walletAddress: string;
    stakeKey?: string;
    email?: string;
    userName?: string;
}
