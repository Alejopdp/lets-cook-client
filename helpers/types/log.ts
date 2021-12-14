export interface Log {
    type: string;
    user: string;
    role: string;
    action: string;
    debugAction: string;
    customerId: string;
    timestamp: Date;
}
