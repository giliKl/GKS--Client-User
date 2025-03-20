import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { UserType } from '../../Types/UserType';
import { Roles } from '../../Types/RoleType';

const url = "http://localhost:3000/api";

class UserStore {
    user = {} as UserType;
    token:string|null = null;
    loading:boolean = false;
    error:string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchUser(userId:number){
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to load user";
                this.loading = false;
            });
        }
    }

    async registerUser(user:Partial<UserType>,roles:Roles[]) {
        this.loading = true;
        this.error = null;
        try {
            console.log(JSON.stringify({ user: user, roles: roles }, null, 2));
            const response = await axios.post(`${url}/Auth/register`, {user:user,roles:roles}, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user = response.data.user;
                this.token = response.data.token;
                console.log(this.user,this.token);
                if(this.token){
                    sessionStorage.setItem('token', this.token);
                }
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to register user";
                this.loading = false;
            });
        }
    }

    async deleteUser(userId:number) {
        this.loading = true;
        this.error = null;
        try {
            await axios.delete(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = {} as UserType;
                this.token = null;
                this.loading = false;
                sessionStorage.removeItem('token');
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to delete user";
                this.loading = false;
            });
        }
    }

    async loginUser(email: string, password: string,roles:Roles[]) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.post(`${url}/Auth/login`, { email, password ,roles}, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user = response.data.user;
                this.token = response.data.token;
                this.loading = false;
                console.log(response.data.user,response.data.token);
                if(this.token){
                    sessionStorage.setItem('token', this.token);
                }
            });
        } catch (error : any) {
            runInAction(() => {
                this.error = error.message || "Failed to login";
                this.loading = false;
            });
        }
    }

    async getUserByEmail(email:string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${email}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to get user by email";
                this.loading = false;
            });
        }
    }

    async updateName(id:number, name:string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.put(`${url}/name/${id}`, { name }, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user.name = response.data.name;
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to update name";
                this.loading = false;
            });
        }
    }

    async updatePassword(id:number, password:string) {
        this.loading = true;
        this.error = null;
        try {
            await axios.put(`${url}/password/${id}`, { password }, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to update password";
                this.loading = false;
            });
        }
    }
}

const userStore = new UserStore();
export default userStore ;
