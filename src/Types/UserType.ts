import { Roles } from "./RoleType";

export type UserType ={
    id: number;
    name: string;
    email: string;
    password: string;
    filesId: number[];
    isActive: boolean;
    roles: Roles[];
}


