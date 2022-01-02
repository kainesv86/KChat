export interface UserLoginDto {
        username: string;
        password: string;
}

export interface UserRegisterDto {
        username: string;
        password: string;
        confirmPassword: string;
        email: string;
}

export interface AuthState {
        email: string;
        username: string;
        name: string;
        description: string;
        avatarUrl: string;
        id: string;
        isLogin: boolean;
}
