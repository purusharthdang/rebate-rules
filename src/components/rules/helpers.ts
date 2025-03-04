import { Rule } from "./rules.types";

export const refreshAllOperators = (rules: Rule[]) => {
    return rules.map((rule) => {
        if (!rule.isActive) {
            // Inactive rules should keep all operators enabled (reset state)
            return {
                ...rule,
                operators: rule.operators.map(op => ({ ...op, disabled: false })),
            };
        }

        const conflictingRule = rules.find(
            (other) =>
                other.isActive &&
                other.mutuallyExclusiveWith?.includes(rule.id)
        );

        const disabledOperators = conflictingRule?.selectedOperator
            ? [conflictingRule.selectedOperator]
            : [];

        const updatedOperators = rule.operators.map((operator) => ({
            ...operator,
            disabled: disabledOperators.includes(operator.value),
        }));

        let selectedOperator = rule.selectedOperator;

        // If current operator becomes invalid, auto-select the first available one
        if (selectedOperator && disabledOperators.includes(selectedOperator)) {
            selectedOperator = updatedOperators.find(op => !op.disabled)?.value;
        }

        return { ...rule, operators: updatedOperators, selectedOperator };
    });
};

