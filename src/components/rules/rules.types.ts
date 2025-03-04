export type OperatorType = 'inclusion' | 'exclusion';

export interface SelectedRules {
    [ruleName: string]: {
        id: string;
        operator: string;
        values: string[];
    }
}

export interface Operator {
    value: string;
    label: string;
    disabled?: boolean;
}

export type RuleCategory = 'product-based' | 'discount-codes' | 'cart-based'

export interface Rule {
    id: string;
    label: string;
    priority: number;
    operators: Operator[];
    type: RuleCategory;
    selectedOperator?: string;
    values?: string[];
    mutuallyExclusiveWith?: string[];
    component: string;
    isActive: boolean;
}