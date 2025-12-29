const {
    Worker
} = require('worker_threads');
const os = require('os');

const baseList = ["OG Kush", "Sour Diesel", "Green Crack", "Grand Daddy Purp", "Cocaine", "Meth", "Shroom"];
const substanceList = ["Cuke", "Flu Medicine", "Gasoline", "Donut", "Energy Drink", "Mouth Wash", "Motor Oil", "Banana", "Chili", "Iodine", "Paracetamol", "Viagra", "Horse Semen", "Mega Bean", "Addy", "Battery"];

function runWorkers(base, substances) {
    if (base < 0 || base >= baseList.length) base = 0;
    if (substances < 1) substances = 1;

    const numThreads = os.cpus().length;
    const maxSeed = substanceList.length ** substances;
    const chunk = Math.ceil(maxSeed / numThreads);

    let finished = 0;
    let bestMix = [0, [],
        [], 0, 0, 0, 0
    ];
    const startTime = Date.now();
    let progressInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        const seedsDone = progressByWorker.reduce((a, b) => a + b, 0);
        const seedsPerSec = seedsDone / elapsed;
        const remaining = maxSeed - seedsDone;
        const estTimeLeft = seedsPerSec > 0 ? remaining / seedsPerSec : 0;
        const percentByWorker = progressByWorker.map(p => (p / chunk) * 100);
        console.log(
            `Progress: \x1B[34m${Math.min(seedsDone, maxSeed)}/${maxSeed}\x1B[0m | \x1B[1m${seedsPerSec.toFixed(2)} seeds/s\x1B[0m | Time left: \x1B[31m${estTimeLeft.toFixed(1)}s\x1B[0m\nCurrent best mix: [Seed: \x1B[32m${bestMix[0]}\x1B[0m] \x1B[33m${bestMix[1].join(', ')}\nEffects: \x1B[35m${bestMix[2].join(', ')}\x1B[0m | Profit: \x1B[36m${bestMix[6].toFixed(2)}\x1B[0m\nLoad: ${percentByWorker.map((p, i) => `\x1B[34mThread ${i + 1}\x1B[0m: \x1B[31m${p.toFixed(2)}%\x1B[0m`).join(', ')}`
        );
    }, 2000);

    let progressByWorker = Array(numThreads).fill(0);

    for (let t = 0; t < numThreads; t++) {
        const start = t * chunk;
        const end = Math.min(start + chunk, maxSeed);
        const worker = new Worker('./worker.js');
        worker.postMessage({
            start,
            end,
            base,
            substances
        });
        worker.on('message', (msg) => {
            if (msg.progress !== undefined) {
                progressByWorker[t] = msg.progress;
                if (msg.bestMix[6] > bestMix[6]) bestMix = msg.bestMix;
            }
            if (msg.done) {
                finished++;
                if (finished === numThreads) {
                    clearInterval(progressInterval);
                    // Affiche le meilleur mix global
                    console.log(`Most Profitable Mix for base "${baseList[base]}" with ${substances} \x1B[33msubstances: ${bestMix[1].join(', ')}`);
                    console.log(`\x1B[35mEffects: ${bestMix[2].join(', ')}\x1B[0m`);
                    console.log(`Total Multiplier: ${bestMix[3].toFixed(2)}`);
                    console.log(`\x1B[32mFinal Price: $${bestMix[4].toFixed(2)}`);
                    console.log(`\x1B[31mTotal Cost: $${bestMix[5].toFixed(2)}`);
                    console.log(`\x1B[36mProfit: $${bestMix[6].toFixed(2)}\x1B[0m`);
                    console.log(`Seed: ${bestMix[0]}/${maxSeed - 1}`);
                    worker.terminate();
                    process.exit(0);
                }
            }
        });
    }
}

const base = process.argv[2] || 0;
const substances = process.argv[3] || 1;

runWorkers(parseInt(base), parseInt(substances));