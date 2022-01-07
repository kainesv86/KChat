export interface ApiState {
        isLoading: boolean;
        errorDetails: {};
        isError: boolean;
        message: string;
        errorMessage: string;
}

export interface JoiError {
        [key: string]: string;
}
