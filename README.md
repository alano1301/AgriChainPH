# AgriChainPH

A complete farm-to-market traceability prototype powered by Ethereum-compatible local blockchain development.

## What is included
- Solidity contract: `backend/AgriChainPH.sol`
- Deploy script: `backend/deploy.js`
- Backend API server: `backend/server.js`
- Frontend UI: `frontend/index.html`, `frontend/style.css`, `frontend/app.js`
- Ganache-compatible configuration

## Setup

1. Install Node.js (LTS) and Ganache.
2. Start Ganache UI or run `ganache --port 7545`.
3. Open a terminal inside `AgriChainPH/backend`.
4. Install backend dependencies:
   ```bash
   npm install
   ```
5. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   cd ../backend
   ```
6. Set the deployer private key from Ganache:
   - Use the first Ganache account private key.
   - Create a `.env` file from `.env.example` or export environment variables:
     ```bash
     set PRIVATE_KEY=0x...
     set RPC_URL=http://127.0.0.1:7545
     ```
7. Deploy the contract:
   ```bash
   npm run deploy
   ```
8. Build the React frontend:
   ```bash
   cd ../frontend
   npm run build
   cd ../backend
   ```
9. Start the backend server:
   ```bash
   npm start
   ```
10. Open your browser and visit:
   ```
   http://localhost:5000
   ```

Alternatively, run the React frontend in development mode:

```bash
cd frontend
npm run dev
```

Then open the Vite URL shown in the terminal.

## Usage
- Register a product with name, origin, and quantity.
- View product details by ID.
- Transfer ownership to a new address.
- Inspect transactions in Ganache to verify blockchain activity.

## Notes
- The backend reads `backend/contractConfig.json` after deploy.
- If you change the contract, re-run `npm run deploy`.
# AgriChainPH
