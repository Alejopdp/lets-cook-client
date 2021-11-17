export interface Plan {
    id: string;
    name: string;
    sku: string;
    description: string;
    availablePlanFrecuencies: Frequency[];
    isActive: boolean;
    type: PlanType;
    imageUrl: string;
    hasRecipes: boolean;
    variants: PlanVariant[];
    attributes: [string, string[]][];
    additionalPlans: Plan[];
    icon: string;
    iconWithColor: string;
    abilityToChooseRecipes: boolean;
    slug: string;
}

export interface PlanVariant {
    id: string;
    isDefault: boolean;
    description: string;
    sku: string;
    price: number;
    priceWithOffer: number;
    attributes: PlanVariantAttribute[];
    isDeleted: boolean;
    auxId?: string;
    oldId?: string;
}

export type PlanVariantAttribute = [string, string];

export enum PlanType {
    Adicional = "Adicional",
    Principal = "Principal",
}

export interface Frequency {
    value: "one_time" | "weekly" | "biweekly" | "monthly";
    label: string;
}
