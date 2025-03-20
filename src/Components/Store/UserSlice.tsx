import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../Types/UserType';
import { RootStore } from './Store';
import axios from 'axios';
const url = "http://localhost:3000/api";


export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId: number, thunkApi) => {
    try {
        const response = await axios.get(`${url}/User/${userId}`);
        return response.data as UserType;
    }
    catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to get user');
    }
});

export const fetchUserByEmail = createAsyncThunk('user/fetchUserByEmail', async (email: string, thunkApi) => {
    try {
        const response = await axios.get(`${url}/User/email/`, { params: { email } });
        return response.data as UserType;
    }
    catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to get user');
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId: number, thunkApi) => {
    try {
        await axios.delete(`${url}/User/${userId}`);
        return userId;
    }
    catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to delete user');
    }
});

export const updatePassword = createAsyncThunk("users/updatePassword", async ({ id, password }: { id: number; password: string }, thunkApi) => {
    try {
        await axios.put(`${url}/User/${id}/password`, password, {
            headers: { "Content-Type": "application/json" },
        });
        return { id }; // מחזירים רק את ה-ID לאישור שהעדכון בוצע
    } catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to update password');
    }
}
);
export const updateName = createAsyncThunk("users/updateName", async ({ id, name }: { id: number; name: string }, thunkApi) => {
    try {
        await axios.put(`${url}/User/${id}/name`, name, {
            headers: { "Content-Type": "application/json" },
        });
        return { id };
    } catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to update name');
    }
}
);

export const registerUser = createAsyncThunk('user/register', async (user: Partial<UserType>, thunkApi) => {
    try {
        const response = await axios.post(`${url}/Auth/register`, user, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to register user');
    }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }: { email: string, password: string }, thunkApi) => {
    try {
        const response = await axios.post(`${url}/Auth`, { email, password }, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkApi.rejectWithValue(error.message);
        }
        return thunkApi.rejectWithValue('Failed to login');
    }
});





const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as UserType,
        loading: false,
        error: null as string | null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // Fetch user by ID
        .addCase(fetchUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Fetch user by Email
        .addCase(fetchUserByEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserByEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchUserByEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete user
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.loading = false;
            state.user = {} as UserType; // מאפסים את המשתמש אם נמחק
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update password
        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updatePassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update name
        .addCase(updateName.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateName.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateName.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Register user
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Login user
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

 }          
});
export const selectUsers = (state: RootStore) => state.user;
export const { } = UserSlice.actions;
export default UserSlice;