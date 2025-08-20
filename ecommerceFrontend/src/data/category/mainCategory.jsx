export const mainCategory = [
    {
        name: "Men",
        categoryId: "men",
        level: 1,
        levelTwoCategory: [
            {
                name: "Topwear",
                categoryId: "men_topwear",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Bottomwear",
                categoryId: "men_bottomwear",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Indian & Festive Wear",
                categoryId: "men_indian_festive_wear",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Innerwear & Sleepwear",
                categoryId: "men_innerwear_sleepwear",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Plus Size",
                categoryId: "men_plus_size",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Footwear",
                categoryId: "men_footwear",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Personal Care & Grooming",
                categoryId: "men_personal_care_grooming",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Accessories",
                categoryId: "men_accessories",
                parentCategoryId: "men",
                level: 2
            },
            {
                name: "Sports & Active Wear",
                categoryId: "men_sports_active_wear",
                parentCategoryId: "men",
                level: 2
            }
        ]
    },
    {
        name: "Women",
        categoryId: "women",
        level: 1,
        levelTwoCategory:  [
            { name: "Indian & Fusion Wear", categoryId: "women_indian_fusion_wear", parentCategoryId: "women", level: 2 },
            { name: "Western Wear", categoryId: "women_western_wear", parentCategoryId: "women", level: 2 },
            { name: "Footwear", categoryId: "women_footwear", parentCategoryId: "women", level: 2 },
            { name: "Lingerie & Sleepwear", categoryId: "women_lingerie_sleepwear", parentCategoryId: "women", level: 2 },
            { name: "Accessories", categoryId: "women_accessories", parentCategoryId: "women", level: 2 },
            { name: "Beauty & Personal Care", categoryId: "women_beauty_personalcare", parentCategoryId: "women", level: 2 }
            
        ]
    },
    {
        name: "Home & Furniture",
        categoryId: "home_furniture",
        level: 1,
        levelTwoCategory:[
            { name: "Bed Linen & Furnishing", categoryId: "home_bed_furnishing", parentCategoryId: "home_furniture", level: 2 },
            { name: "Home Décor", categoryId: "home_decor", parentCategoryId: "home_furniture", level: 2 },
            { name: "Kitchen & Table", categoryId: "home_kitchen_table", parentCategoryId: "home_furniture", level: 2 },
            { name: "Bath", categoryId: "home_bath", parentCategoryId: "home_furniture", level: 2 },
            { name: "Lamps & Lighting", categoryId: "home_lamps_lighting", parentCategoryId: "home_furniture", level: 2 }
        ]
    },
    {
        name: "Electronics",
        categoryId: "electronics",
        level: 1,
        levelTwoCategory:[
            { name: "Mobiles & Accessories", categoryId: "electronics_mobiles", parentCategoryId: "electronics", level: 2 },
            { name: "Laptops & Tablets", categoryId: "electronics_laptops", parentCategoryId: "electronics", level: 2 },
            { name: "Audio", categoryId: "electronics_audio", parentCategoryId: "electronics", level: 2 },
            { name: "Smart Wearables", categoryId: "electronics_wearables", parentCategoryId: "electronics", level: 2 },
            { name: "Gaming", categoryId: "electronics_gaming", parentCategoryId: "electronics", level: 2 }
        ]
    }
];
