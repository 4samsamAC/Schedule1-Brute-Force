function newMix(seed = 0, base = 0, w = 1) {
    const basePrice = basePrices[baseList[base]];
    let effects = [baseEffects[baseList[base]]];
    const count = [Math.floor(seed / substanceList.length), seed % substanceList.length];
    const mix = [];
    let price = 0;
    let sell = 0;

    mix.push(baseList[base]);

    for (let i = 0; i < w; i++) {
        mix.push(substanceList[count[1]]);
        price += substancePrices[substanceList[count[1]]];
        const rules = effectRules[substanceList[count[1]]] || {};
        effects = effects.map(eff => rules[eff] || eff);
        const defaultEffect = defaultEffectMap[substanceList[count[1]]];
        if (defaultEffect && effects.length < 8 && !effects.includes(defaultEffect)) {
            effects.push(defaultEffect);
        }
        count[1] = (count[1] + 1) % substanceList.length;
        if (count[1] === 0) {
            count[0]++;
        }
    }

    effects = [...new Set(effects)].slice(0, 8);
    const totalMultiplier = effects.reduce((sum, eff) => sum + (effectMultipliers[eff] || 0), 0);
    const finalPrice = basePrice * (1 + totalMultiplier);
    const totalCost = mix.reduce((sum, s) => sum + (substancePrices[s] || 0), 0);
    const profit = finalPrice - totalCost;

    return [mix, effects, totalMultiplier, finalPrice, totalCost, profit];
}

function main() {
    let mostProfitableMix = [0, [],
        [], 0, 0, 0, 0
    ];

    let maxSeed = substanceList.length * substances;

    for (let i = 0; i < maxSeed; i++) {
        const [mix, effects, totalMultiplier, finalPrice, totalCost, profit] = newMix(i, base, substances);
        if (profit > mostProfitableMix[6]) {
            mostProfitableMix = [
                i,
                mix,
                effects,
                totalMultiplier,
                finalPrice,
                totalCost,
                profit
            ];
        }
    }
    console.log(`Most Profitable Mix for base "${baseList[base]}" with ${substances} \x1B[33msubstances: ${mostProfitableMix[1].join(', ')}`);
    console.log(`\x1B[35mEffects: ${mostProfitableMix[2].join(', ')}\x1B[0m`);
    console.log(`Total Multiplier: ${mostProfitableMix[3].toFixed(2)}`);
    console.log(`\x1B[32mFinal Price: $${mostProfitableMix[4].toFixed(2)}`);
    console.log(`\x1B[31mTotal Cost: $${mostProfitableMix[5].toFixed(2)}`);
    console.log(`\x1B[36mProfit: $${mostProfitableMix[6].toFixed(2)}\x1B[0m`);
    console.log(`Seed: ${mostProfitableMix[0]}`);
}

const substanceList = [
    "Cuke", "Flu Medicine", "Gasoline", "Donut", "Energy Drink", "Mouth Wash", "Motor Oil", "Banana", "Chili", "Iodine", "Paracetamol", "Viagra", "Horse Semen", "Mega Bean", "Addy", "Battery"
];

const baseList = [
    "OG Kush", "Sour Diesel", "Green Crack", "Grand Daddy Purp", "Cocaine", "Meth"
];

const effectMultipliers = {
    "Anti-Gravity": 0.54,
    "Athletic": 0.32,
    "Balding": 0.30,
    "Bright-Eyed": 0.40,
    "Calming": 0.10,
    "Calorie-Dense": 0.28,
    "Cyclopean": 0.56,
    "Disorienting": 0.00,
    "Electrifying": 0.50,
    "Energizing": 0.22,
    "Euphoric": 0.18,
    "Explosive": 0.00,
    "Focused": 0.16,
    "Foggy": 0.36,
    "Gingeritis": 0.20,
    "Glowing": 0.48,
    "Jennerising": 0.42,
    "Laxative": 0.00,
    "Long Faced": 0.52,
    "Munchies": 0.12,
    "Paranoia": 0.00,
    "Refreshing": 0.14,
    "Schizophrenia": 0.00,
    "Sedating": 0.26,
    "Seizure-Inducing": 0.00,
    "Shrinking": 0.60,
    "Slippery": 0.34,
    "Smelly": 0.00,
    "Sneaky": 0.24,
    "Spicy": 0.38,
    "Thought-Provoking": 0.44,
    "Toxic": 0.00,
    "Tropic Thunder": 0.46,
    "Zombifying": 0.58
};

const substancePrices = {
    "Cuke": 2,
    "Banana": 2,
    "Paracetamol": 3,
    "Donut": 3,
    "Viagra": 4,
    "Mouth Wash": 4,
    "Flu Medicine": 5,
    "Gasoline": 5,
    "Energy Drink": 6,
    "Motor Oil": 6,
    "Mega Bean": 7,
    "Chili": 7,
    "Battery": 8,
    "Iodine": 8,
    "Addy": 9,
    "Horse Semen": 9
};

const basePrices = {
    "OG Kush": 35,
    "Sour Diesel": 35,
    "Green Crack": 35,
    "Grand Daddy Purp": 35,
    "Cocaine": 150,
    "Meth": 70
};

const baseEffects = {
    "OG Kush": "Calming",
    "Sour Diesel": "Refreshing",
    "Green Crack": "Energizing",
    "Grand Daddy Purp": "Sedating",
    "Cocaine": NaN,
    "Meth": NaN
};

const defaultEffectMap = {
    "Cuke": "Energizing",
    "Flu Medicine": "Sedating",
    "Gasoline": "Toxic",
    "Donut": "Calorie-Dense",
    "Energy Drink": "Athletic",
    "Mouth Wash": "Balding",
    "Motor Oil": "Slippery",
    "Banana": "Gingeritis",
    "Chili": "Spicy",
    "Iodine": "Jennerising",
    "Paracetamol": "Sneaky",
    "Viagra": "Tropic Thunder",
    "Horse Semen": "Long Faced",
    "Mega Bean": "Foggy",
    "Addy": "Thought-Provoking",
    "Battery": "Bright-Eyed"
};

const effectRules = {
    "Cuke": {
        "Euphoric": "Laxative",
        "Foggy": "Cyclopean",
        "Gingeritis": "Thought-Provoking",
        "Munchies": "Athletic",
        "Slippery": "Munchies",
        "Sneaky": "Paranoia",
        "Toxic": "Euphoric"
    },
    "Flu Medicine": {
        "Athletic": "Munchies",
        "Calming": "Bright-Eyed",
        "Cyclopean": "Foggy",
        "Electrifying": "Refreshing",
        "Euphoric": "Toxic",
        "Focused": "Calming",
        "Laxative": "Euphoric",
        "Munchies": "Slippery",
        "Shrinking": "Paranoia",
        "Thought-Provoking": "Gingeritis"
    },
    "Gasoline": {
        "Disorienting": "Glowing",
        "Electrifying": "Disorienting",
        "Energizing": "Euphoric",
        "Euphoric": "Spicy",
        "Gingeritis": "Smelly",
        "Jennerising": "Sneaky",
        "Laxative": "Foggy",
        "Munchies": "Sedating",
        "Paranoia": "Calming",
        "Shrinking": "Focused",
        "Sneaky": "Tropic Thunder"
    },
    "Donut": {
        "Anti-Gravity": "Slippery",
        "Balding": "Sneaky",
        "Calorie-Dense": "Explosive",
        "Focused": "Euphoric",
        "Jennerising": "Gingeritis",
        "Munchies": "Calming",
        "Shrinking": "Energizing"
    },
    "Energy Drink": {
        "Disorienting": "Electrifying",
        "Euphoric": "Energizing",
        "Focused": "Shrinking",
        "Foggy": "Laxative",
        "Glowing": "Disorienting",
        "Schizophrenia": "Balding",
        "Sedating": "Munchies",
        "Spicy": "Euphoric",
        "Tropic Thunder": "Sneaky"
    },
    "Mouth Wash": {
        "Calming": "Anti-Gravity",
        "Calorie-Dense": "Sneaky",
        "Explosive": "Sedating",
        "Focused": "Jennerising"
    },
    "Motor Oil": {
        "Energizing": "Munchies",
        "Euphoric": "Sedating",
        "Foggy": "Toxic",
        "Munchies": "Schizophrenia",
        "Paranoia": "Anti-Gravity"
    },
    "Banana": {
        "Calming": "Sneaky",
        "Cyclopean": "Energizing",
        "Disorienting": "Focused",
        "Energizing": "Thought-Provoking",
        "Focused": "Seizure-Inducing",
        "Long Faced": "Refreshing",
        "Paranoia": "Jennerising",
        "Smelly": "Anti-Gravity",
        "Toxic": "Smelly"
    },
    "Chili": {
        "Anti-Gravity": "Tropic Thunder",
        "Athletic": "Euphoric",
        "Laxative": "Long Faced",
        "Munchies": "Toxic",
        "Shrinking": "Refreshing",
        "Sneaky": "Bright-Eyed"
    },
    "Iodine": {
        "Calming": "Balding",
        "Calorie-Dense": "Gingeritis",
        "Euphoric": "Seizure-Inducing",
        "Foggy": "Paranoia",
        "Refreshing": "Thought-Provoking",
        "Toxic": "Sneaky"
    },
    "Paracetamol": {
        "Calming": "Slippery",
        "Electrifying": "Athletic",
        "Energizing": "Paranoia",
        "Focused": "Gingeritis",
        "Foggy": "Calming",
        "Glowing": "Toxic",
        "Munchies": "Anti-Gravity",
        "Paranoia": "Balding",
        "Spicy": "Bright-Eyed",
        "Toxic": "Tropic Thunder"
    },
    "Viagra": {
        "Athletic": "Sneaky",
        "Disorienting": "Toxic",
        "Euphoric": "Bright-Eyed",
        "Laxative": "Calming",
        "Shrinking": "Gingeritis"
    },
    "Horse Semen": {
        "Anti-Gravity": "Calming",
        "Gingeritis": "Refreshing",
        "Seizure-Inducing": "Energizing",
        "Thought-Provoking": "Electrifying"
    },
    "Mega Bean": {
        "Athletic": "Laxative",
        "Calming": "Glowing",
        "Energizing": "Cyclopean",
        "Focused": "Disorienting",
        "Jennerising": "Paranoia",
        "Seizure-Inducing": "Focused",
        "Shrinking": "Electrifying",
        "Slippery": "Toxic",
        "Sneaky": "Calming",
        "Thought-Provoking": "Energizing"
    },
    "Addy": {
        "Explosive": "Euphoric",
        "Foggy": "Energizing",
        "Glowing": "Refreshing",
        "Long Faced": "Electrifying",
        "Sedating": "Gingeritis"
    },
    "Battery": {
        "Cyclopean": "Glowing",
        "Electrifying": "Euphoric",
        "Euphoric": "Zombifying",
        "Laxative": "Calorie-Dense",
        "Munchies": "Tropic Thunder",
        "Shrinking": "Munchies"
    }
};

const base = process.argv[2] || 0;
const substances = process.argv[3] || 1;

main();