export interface AuthState {
    token?: string;
    type?: string;
    email?: string;
    authorities?: Authority[];
    failureReason?: string;
    initialized: boolean;
    isWrongCredentials: boolean;
}

export interface Authority {
    authority: string;
}
