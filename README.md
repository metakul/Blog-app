# eth_signer

This project demonstrates how to sign and verify data using ECDSA (Elliptic Curve Digital Signature Algorithm) in Node.js with TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
  - [Testing](#testing)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.x or later)
- npm (version 6.x or later)

## Installation

Install dependencies using npm:

```bash
npm install
```

## Usage
## Development

To run the project in development mode with automatic rebuilds on file changes, use:
```bash
npm run dev
```

## Production

To build the project and run the compiled JavaScript code, use:

```bash
npm start
```

## Testing

To run tests, first build the project, then run the tests:

```bash
npm test
```

## Project Structure

eth_signer/
├── dist/              # Compiled TypeScript code /n
├── src/               # Source files /n
│   ├── dataTypes/
│   │   ├── interfaces.ts
│   ├── utils/
│   │   ├── keyGeneration.ts
│   │   ├── signing.ts
│   │   └── verification.ts
│   └── index.ts       # Main application entry point
├── tests/             # Unit tests
│   └── signAndVerify.test.ts
├── .gitignore
├── package.json
├── README.md          # Project documentation
└── tsconfig.json      # TypeScript configuration
 
