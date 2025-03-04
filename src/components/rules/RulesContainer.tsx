import { Button, IconSource, SelectOption } from '@shopify/polaris'
import Rules from './Rules'
import { PlusIcon } from '@shopify/polaris-icons'
import { useMemo, useState } from 'react'
import { Rule, RuleCategory } from './rules.types'
import { RuleCategoryMap, RulesData } from './rulesConstants'
import { refreshAllOperators } from './helpers'

const RulesContainer = () => {
    const [rules, setRules] = useState<Rule[]>(RulesData);
    const [activeRuleIds, setActiveRuleIds] = useState<Record<string, boolean>>({});

    const checkForInActiveRules = () => rules.findIndex(rule => !rule.isActive);

    const handleAddRule = () => {
        const inActiveRuleIndex = checkForInActiveRules();
        if (inActiveRuleIndex === -1) return;

        const newRules = rules.map((rule, index) => {
            if (index === inActiveRuleIndex) {
                return { ...rule, isActive: true };
            }
            return rule;
        });

        const refreshedRules = refreshAllOperators(newRules);

        const addedRule = refreshedRules[inActiveRuleIndex];
        if (!addedRule.selectedOperator) {
            addedRule.selectedOperator = addedRule.operators.find(op => !op.disabled)?.value;
        }

        setActiveRuleIds((prev) => ({
            ...prev,
            [addedRule.id]: true
        }));
        setRules(refreshedRules);
    };


    const handleUpdateOrDeleteRuleCategory = (toRemoveId: string, toAddId?: string) => {
        let newRules = rules.map((rule) => {
            if (rule.id === toRemoveId) {
                return {
                    ...rule,
                    isActive: false,
                    values: [],
                    selectedOperator: undefined, // Reset this since it's inactive
                };
            }
            if (rule.id === toAddId) {
                return {
                    ...rule,
                    isActive: true,
                };
            }
            return rule;
        });

        setActiveRuleIds((prev) => {
            const updated = { ...prev };
            delete updated[toRemoveId];
            if (toAddId) updated[toAddId] = true;
            return updated;
        });

        const refreshedRules = refreshAllOperators(newRules);
        setRules(refreshedRules);
    };



    const handleRuleOperatorChange = (ruleId: string, newOperator: string) => {
        let newRules = rules.map((rule) => {
            if (rule.id === ruleId) {
                return { ...rule, selectedOperator: newOperator };
            }
            return rule;
        });

        const refreshedRules = refreshAllOperators(newRules);
        setRules(refreshedRules);
    };



    const handleValueChange = (rule: Rule, newValues: string, isMinOrMax?: 'min' | 'max') => {
        const indexToUpdate = rule.priority - 1;

        const updatedRules = [...rules];
        switch (rule.id) {
            case 'specific-collections':
            case 'specific-products':
            case 'product-tags':
                updatedRules[indexToUpdate] = {
                    ...rule,
                    values: rule.values?.includes(newValues) ? rule.values?.filter((value) => value !== newValues) : [...rule.values ?? [], newValues]
                }
                break;
            case 'specific-discount-codes':
                updatedRules[indexToUpdate] = {
                    ...rule,
                    values: [newValues]
                }
                break;
            case 'cart-value-range':
                let updatedValues = [...(rule.values ?? [])];

                if (isMinOrMax === 'min') {
                    updatedValues[0] = newValues; // Update min (first value)
                } else if (isMinOrMax == 'max') {
                    updatedValues[1] = newValues; // Update max (second value)
                } else {
                    updatedValues = [newValues]
                }
                updatedRules[indexToUpdate] = {
                    ...rule,
                    values: updatedValues
                }
                break;
            default:
                break;
        }

        setRules(updatedRules)
    }

    const ruleOptions = useMemo(() => {
        const grouped = new Map<string, SelectOption[]>();

        for (const rule of rules) {
            if (!grouped.has(rule.type)) {
                grouped.set(rule.type, []);
            }
            (grouped.get(rule.type) ?? grouped.set(rule.type, []).get(rule.type))!.push({ label: rule.label, value: rule.id, disabled: activeRuleIds[rule.id] });
        }

        return Array.from(grouped.entries()).map(([title, options]) => ({
            title: RuleCategoryMap[title as RuleCategory],
            options
        }));
    }, [rules]);

    const activeRules = useMemo(() => rules.filter(rule => rule.isActive), [rules]);

    return (
        <div className="flex flex-col gap-4">
            <div className="leading-[20px] text-sm font-medium">Show offer if</div>
            {rules?.map((item, index) => {
                if (item.isActive) {
                    const isFirstVisible = activeRules[0].id === item.id;
                    const isLastVisible = activeRules[activeRules.length - 1].id === item.id;

                    return (
                        <div className='flex w-full'>
                            {activeRules.length > 1 &&
                                <div className='relative flex flex-col'>
                                    {(!isFirstVisible || isLastVisible) && (
                                        <div id='and-connector-bottom'
                                            className={`${(rules[index - 1].values ?? [])?.length > 0 ? 'h-6 -mt-3' : 'h-3 -mt-1'} absolute ml-2 border-b-1 border-l-1 w-6 border-neutral-300 -py-6 z-10`} />
                                    )}

                                    {!isLastVisible && (
                                        <div id='and-connector-top' className={`fixed mt-4 ml-2 border-t-1 border-l-1 w-6 ${(item.values ?? [])?.length > 0 ? 'h-[30px]' : 'h-3'} border-neutral-300 z-10`}>
                                            <div className={`fixed -ml-3 text-neutral-600 font-semibold ${(item.values ?? [])?.length > 0 ? 'mt-8' : 'mt-2'}`}>
                                                AND
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            <div className={`${activeRules.length !== 1 ? 'pl-8' : ''} w-full`}>
                                <Rules
                                    key={item.id + index}
                                    rule={item}
                                    ruleOptions={ruleOptions}
                                    handleUpdateOrDeleteRuleCategory={handleUpdateOrDeleteRuleCategory}
                                    handleRuleOperatorChange={handleRuleOperatorChange}
                                    handleValueChange={handleValueChange}
                                />
                            </div>
                        </div>
                    )
                }
            })}

            {Object.keys(activeRuleIds).length !== RulesData.length ?
                <div className='w-fit self-center text-black'>
                    <Button onClick={handleAddRule} icon={PlusIcon as IconSource}>AND</Button>
                </div>
                : null
            }
        </div>
    )
}

export default RulesContainer