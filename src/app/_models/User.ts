export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    roles: string[];
}