export interface ActivistRequest {
    id: number;
    email: string;
    accepted: boolean;
    timestamp: string;
}

export interface AskedActivistRequest {
    email?: string;
    askedAt: string;
    accepted: boolean;
}

export interface ActivistRequestState {
    askedRequest: AskedActivistRequest | null;
    status: 'loading' | 'idle' | 'error';
};
