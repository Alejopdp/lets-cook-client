export type Customer = {
    id: string;
    email: string;
    name: string;
    lastName: string;
    fullName: string;
    phone1: string;
    phone2: string;
    preferredLanguage: string;
    shippingAddress: ShippingAddress;
    billingData: BillingData;
    paymentMethods: PaymentMethod[];
    friendCode: string
    wallet: Wallet | undefined
}

export type Wallet = {
    id: string;
    balance: number;
    amountToCharge: number;
    paymentMethodForCharging: string;
    last4Numbers: string;
    isEnabled: boolean;
    datesOfCharge: { dayNumber: number, hour: string, minute: string }[]
    walletMovementsLogs: WalletMovement[];
}

export type WalletMovement = {
    type: string;
    title: string;
    description: string;
    createdAt: string;
    amount: number;
}

export type ShippingAddress = {
    addressDetails: string;
    addressName: string;
    preferredShippingHour: string;
    latitude: number;
    longitude: number;
    country: string;
    postalCode: string;
    province: string;
    city: string;
}

export type BillingData = {
    addressName: string;
    details: string;
    customerName: string;
    identification: string;
    latitude: number;
    longitude: number;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

export type PaymentMethod = {
    id: string;
    card: string;
    expirationDate: string;
    isDefault: boolean;
}

