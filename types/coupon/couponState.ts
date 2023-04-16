export enum CouponState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
    EXPIRED = "EXPIRED",
    UNAVAILABLE = "UNAVAILABLE",
}

export type CouponLimit = "first_order" | "limit_one_customer" | "limit_qty" //TODO Use it