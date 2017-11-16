import { Dataset } from './dataset';

export class User {
    name: string;
    username: string;
    password: string;
    email: string;
    admin: boolean;
    datasets: Dataset[];
    token: string
}
