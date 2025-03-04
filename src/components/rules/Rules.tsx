import { AutoSelection, Combobox, Icon, IconSource, Listbox, Select, SelectGroup, Tag, TextField } from '@shopify/polaris'
import { useState } from 'react'
import { Rule } from './rules.types'
import { XIcon } from '@shopify/polaris-icons'
import { RuleValuesOptionsMap } from './rulesConstants'

const Rules = ({ rule, ruleOptions, handleUpdateOrDeleteRuleCategory, handleRuleOperatorChange, handleValueChange }:
    {
        rule: Rule,
        ruleOptions: SelectGroup[],
        handleUpdateOrDeleteRuleCategory: (toRemoveId: string, toAddId?: string) => void
        handleRuleOperatorChange: (ruleId: string, newOperator: string) => void
        handleValueChange: (rule: Rule, values: string, isMinOrMax?: 'min' | 'max') => void
    }
) => {
    const [textFieldValue, setTextFieldValue] = useState<string>('');

    const getGridRowClassName = () => {
        switch (rule.component) {
            case 'BooleanSelector':
            case 'DiscountCodeSelector':
                return 'grid-cols-2'
            case 'CartValueSelector':
                return 'grid-cols-4'
            default:
                return 'grid-cols-3'
        }
    }

    const handleRuleCategoryChange = (selected: string) => {
        handleUpdateOrDeleteRuleCategory(rule.id, selected);
    }

    const optionsMarkup =
        RuleValuesOptionsMap[rule.id]?.length > 0
            ? RuleValuesOptionsMap[rule.id].map((option) => {
                // @ts-ignore TODO - fix shopify component type issue
                const { label, value } = option;
                return (
                    // @ts-ignore
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={rule.values?.includes(value)}
                        accessibilityLabel={label}
                    >
                        {label}
                    </Listbox.Option>
                );
            })
            : null;

    const renderInputComponent = () => {
        switch (rule?.component) {
            case 'CollectionSelector':
            case 'TagSelector':
            case 'ProductSelector':
                return (
                    <>
                        <Combobox
                            allowMultiple
                            activator={
                                <Combobox.TextField
                                    autoComplete="off"
                                    label=''
                                    value={textFieldValue}
                                    placeholder="Search or enter value"
                                    onChange={setTextFieldValue}
                                />
                            }
                        >
                            <Listbox
                                autoSelection={AutoSelection.None}
                                onSelect={(value) => handleValueChange(rule, value)}
                            >
                                {optionsMarkup}
                            </Listbox>
                        </Combobox>
                        {rule.values && rule.values?.length > 0 ? <div className=" mb-2 w-full flex flex-wrap gap-2 col-span-3">
                            {rule.values?.map((tag) => (
                                <Tag key={tag} onRemove={() => handleValueChange(rule, tag)}>
                                    {tag}
                                </Tag>
                            ))}
                        </div> : null}
                    </>
                );
            case 'BooleanSelector':
                return null; // No additional input needed for boolean selectors
            case 'CartValueSelector':
                if (rule.selectedOperator === 'between') {
                    return (
                        <>
                            <TextField
                                label=""
                                type="number"
                                prefix="$"
                                autoComplete="off"
                                value={rule.values?.[0] || ''}
                                onChange={(value) => handleValueChange(rule, value, 'min')}
                            />
                            <TextField
                                label=""
                                type="number"
                                prefix="$"
                                autoComplete="off"
                                value={rule.values?.[1] || ''}
                                onChange={(value) => handleValueChange(rule, value, 'max')}
                            />
                        </>
                    );
                } else {
                    return (
                        <TextField
                            label=""
                            type="number"
                            prefix="$"
                            autoComplete="off"
                            value={rule.values?.[0]}
                            onChange={(value) => handleValueChange(rule, value)}
                        />
                    );
                }
            default:
                return (
                    <TextField
                        label=""
                        type="text"
                        autoComplete="on"
                        value={rule.values?.[0] ?? ''}
                        onChange={(value) => handleValueChange(rule, value)}
                    />
                );
        }
    };

    return (
        <div className='flex w-full gap-4'>
            <div className={`grid ${getGridRowClassName()} gap-x-4 gap-y-2 w-full`}>
                <Select label="" options={ruleOptions} onChange={handleRuleCategoryChange} value={rule?.id ?? ''} />
                {rule.component !== 'DiscountCodeSelector' ?
                    <Select label="" options={rule.operators} onChange={(selected: string) => handleRuleOperatorChange(rule.id, selected)} value={rule?.selectedOperator ?? ''} />
                    : null}
                {renderInputComponent()}
            </div>
            <div className='h-4 w-4 mt-2 cursor-pointer' onClick={() => handleUpdateOrDeleteRuleCategory(rule.id)}>
                <Icon source={XIcon as IconSource} tone='primary' />
            </div>
        </div>

    )
}

export default Rules