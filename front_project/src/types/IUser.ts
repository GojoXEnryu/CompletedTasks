export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    emailAddress: string;
    dateOfRegistration: Date;
    cartId: number;
    bonusAmount: number;
}