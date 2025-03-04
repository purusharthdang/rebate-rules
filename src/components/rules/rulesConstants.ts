import { SelectOption } from "@shopify/polaris";
import { Rule } from "./rules.types";

export const RulesData: Rule[] = [
    {
        id: 'specific-collections',
        label: 'Specific collections',
        type: 'product-based',
        priority: 1,
        operators: [
            { value: 'contains-any', label: 'contains any' },
            { value: 'is-not', label: 'is not' }
        ],
        mutuallyExclusiveWith: ['specific-products'],
        component: 'CollectionSelector',
        isActive: false,
        values: []
    },
    {
        id: 'product-tags',
        label: 'Product tags',
        type: 'product-based',
        priority: 2,
        operators: [
            { value: 'contains-any', label: 'contains any' },
            { value: 'is-not', label: 'is not' }
        ],
        component: 'TagSelector',
        isActive: false,
        values: []
    },
    {
        id: 'specific-products',
        label: 'Specific products',
        type: 'product-based',
        priority: 3,
        operators: [
            { value: 'equals-anything', label: 'equals anything' },
            { value: 'contains-any', label: 'contains any' },
            { value: 'is-not', label: 'is not' },
        ],
        mutuallyExclusiveWith: ['specific-collections'],
        component: 'ProductSelector',
        isActive: false,
        values: []
    },
    {
        id: 'product-subscribed',
        label: 'Product subscribed',
        type: 'product-based',
        priority: 4,
        operators: [
            { value: 'yes', label: 'yes' },
            { value: 'no', label: 'no' }
        ],
        component: 'BooleanSelector',
        isActive: false
    },
    {
        id: 'specific-discount-codes',
        label: 'Specific discount codes',
        type: 'discount-codes',
        priority: 5,
        operators: [],
        component: 'DiscountCodeSelector',
        isActive: false,
        values: []
    },
    {
        id: 'cart-value-range',
        label: 'Cart value range',
        type: 'cart-based',
        priority: 6,
        operators: [
            { value: 'greater-than-equal', label: 'is equal or greater than' },
            { value: 'between', label: 'is between' },
            { value: 'less-than', label: 'is less than' }
        ],
        component: 'CartValueSelector',
        isActive: false,
        values: []
    }
];

export const RuleCategoryMap = {
    'product-based': 'Product based',
    'cart-based': 'Cart based',
    'discount-codes': 'Discount codes'
}
const specificCollectionsOptions = [
    { label: 'Summer Collection', value: 'summer-collection' },
    { label: 'Winter Collection', value: 'winter-collection' },
    { label: 'Limited Edition', value: 'limited-edition' },
    { label: 'Essentials', value: 'essentials' },
    { label: 'Collaboration Series', value: 'collaboration-series' },
    { label: 'Retro Vibes', value: 'retro-vibes' },
    { label: 'Eco Friendly', value: 'eco-friendly' }
];

const productTagsOptions = [
    { label: 'Best Seller', value: 'best-seller' },
    { label: 'New Arrival', value: 'new-arrival' },
    { label: 'On Sale', value: 'on-sale' },
    { label: 'Limited Stock', value: 'limited-stock' },
    { label: 'Online Exclusive', value: 'online-exclusive' },
    { label: 'Giftable', value: 'giftable' },
    { label: 'Trending', value: 'trending' },
    { label: 'Top Rated', value: 'top-rated' }
];

const specificProductsOptions = [
    { label: 'Air Jordan 1', value: 'air-jordan-1' },
    { label: 'Yeezy Boost 350', value: 'yeezy-boost-350' },
    { label: 'Converse Chuck 70', value: 'converse-chuck-70' },
    { label: 'New Balance 550', value: 'new-balance-550' },
    { label: 'Adidas Superstar', value: 'adidas-superstar' },
    { label: 'Nike Dunk Low', value: 'nike-dunk-low' },
    { label: 'Puma Suede Classic', value: 'puma-suede-classic' },
    { label: 'Vans Old Skool', value: 'vans-old-skool' },
    { label: 'Reebok Club C', value: 'reebok-club-c' }
];

export const RuleValuesOptionsMap: Record<string, SelectOption[]> = {
    'specific-collections': specificCollectionsOptions,
    'specific-products': specificProductsOptions,
    'product-tags': productTagsOptions
}