# Schedule1-Brute-Force

## Description

**Schedule1-Brute-Force** is a brute-force tool designed to find the most profitable mix in *Schedule I*.  
It uses two parameters: `baseId` and `substanceCount`.  
Originally built with [Bun](https://bun.sh/), a fast JavaScript runtime, this tool also runs perfectly with [Node.js](https://nodejs.org/).

## Usage

To start the tool, run the following command:

```bash
bun index.js {baseId} {substanceCount}
# or
node index.js {baseId} {substanceCount}
```

Replace `{baseId}` and `{substanceCount}` with the appropriate values. For example:

```bash
bun index.js 2 3
# or
node index.js 2 3
```

This will return the most profitable mix using **Green Crack** as the base with **3 other substances**.

### Base IDs

* `0`: OG Kush
* `1`: Sour Diesel
* `2`: Green Crack
* `3`: Grand Daddy Purp
* `4`: Cocaine
* `5`: Meth

## Resources & Inspirations

* [Bun](https://bun.sh/)
* [Node.js](https://nodejs.org/)
* [Schedule1 Tools](https://schedule1.tools/)
* [schedule1-drug-calculator by Leooehh (GitHub)](https://github.com/Leooehh/schedule1-drug-calculator)
* [Schedule1 Calculator](https://schedule1-calculator.com/)

## TODO

* [X] Validate user input (prevent negative numbers and out-of-range values)
* [ ] Add support for pre-mixed substances as input
* [ ] Remove the NaN in the Effects sections.
