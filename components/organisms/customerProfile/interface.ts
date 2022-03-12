import { PlanFrequencyValue } from "helpers/types/frequency";
import { Log } from "helpers/types/log";

export interface ShippingAddress {
    details: string;
    name: string;
    preferredShippingHour: string;
    latitude: number;
    longitude: number;
}

export interface BillingData {
    addressName: string;
    details: string;
    customerName: string;
    identification: string;
    latitude: number;
    longitude: number;
}

export interface PaymentMethod {
    id: string;
    card: string;
    expirationDate: string;
    isDefault: boolean;
}

export interface Personaldata {
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
}

export interface Subscription {
    id: string;
    plan: string;
    variant: string;
    price: string;
    frequency: PlanFrequencyValue;
    status: string;
}

export interface Order {
    id: string;
    date: string;
    plan: string;
    variation: string;
    price: number;
    active: boolean;
}

export interface PaymentOrder {
    id: string;
    date: string;
    ordersQty: number;
    price: number;
    status: string;
}

export interface CustomerInformation {
    personalData: Personaldata;
    subscriptions: Subscription[];
    orders: Order[];
    paymentOrders: PaymentOrder[];
    friendCode: string;
}

export interface CustomerProfileProps {
    data: CustomerInformation;
    logs: Log[];
}

export interface CustomerInfoProps {
    customer: CustomerInformation;
    setCustomer: (newCustomer: CustomerInformation) => void;
    handleUpdatePersonalData: () => void;
    handleUpdateDeliveryAddress: (newShippingAddress: ShippingAddress) => void;
    handleUpdateBillingData: (newBillingData: BillingData) => void;
    handleUpdatePaymentMethods: (newPaymentMethodId: string) => void;
}

export interface DeliveryAddressProps {
    shippingAddress: ShippingAddress;
    customer: CustomerInformation;
    setCustomer: (newCustomer: CustomerInformation) => void;
}

export interface DeliveryAddressModalProps {
    formData: ShippingAddress;
    handleGoogleInput: (e: any) => any;
    handleChange: (e: any) => any;
}

export interface BillingDataProps {
    customer: CustomerInformation;
    handleUpdateBillingData: (newBillingData: BillingData) => void;
}

export interface BillingDataModalProps {
    formData: BillingData;
    handleGoogleInput: (e: any) => any;
    handleChange: (e: any) => any;
}

export interface PaymentMethodProps {
    paymentMethods: PaymentMethod[];
    handleUpdatePaymentMethods: (newPaymentMethodId: string) => void;
    customerId: string;
}

export interface PaymentMethodsModalProps {
    defaultPaymentMethod: PaymentMethod | undefined;
    paymentMethods: PaymentMethod[];
    handlePaymentMethodChange: (newId: string) => void;
    selectedPaymentMethodId: string;
    handleUpdatePaymentMethods: (newPaymentMethodId: string) => void;
}
