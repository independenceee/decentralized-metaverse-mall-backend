export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    role: string;
    password: string;
    refreshToken: string;
}
