import { PlanFrequencyValue } from "helpers/types/frequency";
import { Log } from "helpers/types/log";
import { BillingData, Customer, PaymentMethod, ShippingAddress, Wallet } from "helpers/types/customer";
import { Plan } from "types/plan/plan";
import { FormData } from "./customerInfo/personalData";

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

export type CustomerInformation = {
    subscriptions: Subscription[];
    orders: Order[];
    paymentOrders: PaymentOrder[];
    events: Log[];
} & Customer

export interface CustomerProfileProps {
    data: CustomerInformation;
    logs: Log[];
    plans: Plan[]
}

export interface CustomerInfoProps {
    customer: CustomerInformation;
    setCustomer: (newCustomer: CustomerInformation) => void;
    handleCreateWallet: (wallet: Wallet) => Promise<boolean>;
    handleUpdateWallet: (wallet: Wallet) => Promise<boolean>;
    handleUpdatePersonalData: (formData: FormData) => Promise<void>;
    handleUpdateDeliveryAddress: (newShippingAddress: ShippingAddress) => void;
    handleUpdateBillingData: (newBillingData: BillingData) => void;
    handleUpdatePaymentMethods: (newPaymentMethodId: string) => void;
    handleChargeMoney: (amountToCharge: number) => Promise<boolean>
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
