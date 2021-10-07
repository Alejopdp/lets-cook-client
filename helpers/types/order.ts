export interface SkippableOrder {
    id: string;
    weekLabel: string;
    shippingDate: string;
    isSkipped: boolean;
}

export enum OrderState {
    ORDER_ACTIVE = "ORDER_ACTIVE",
    ORDER_SKIPPED = "ORDER_SKIPPED",
    ORDER_CANCELLED = "ORDER_CANCELLED",
    ORDER_BILLED = "ORDER_BILLED",
    ORDER_PENDING_PAYMENT = "ORDER_PENDING_PAYMENT",
    ORDER_REJECTED_PAYMENT = "ORDER_REJECTED_PAYMENT",
}
