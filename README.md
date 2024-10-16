# Vlock SDK

A lightweight SDK for interacting with the vlock solana program.

## Installation

```bash
npm install vlock-sdk
```

## Usage

```ts
import { Vlock } from "vlock-sdk";

const program = new Program(idl, provider as AnchorProvider);

const vlock = new Vlock(
  program, // The program instance created with Anchor.
  realmName, // The name of the realm.
  realmVoterPublicKey, // The public key of the realm voter (admin wallet).
  blzeTokenMint, // The public key of the BLZE token mint.
  votaBLZEMint // The public key of the votaBLZE token mint.
);
```

## Examples

```ts
// Initialize the vlock program
const initializeProgram = async () => {
  try {
    await vlock.initializeProgram();
  } catch (error) {
    console.log(error);
  }
};

// Initialize the program vaults
const initializeVaults = async () => {
  try {
    await vlock.initializeVaults();
  } catch (error) {
    console.log(error);
  }
};

// Stake BLZE tokens and receive votaBLZE tokens
const stakeTokens = async () => {
  try {
    const amount = new BN(1000).mul(new BN(1_000_000_000));

    await vlock.stakeTokens(amount, new PublicKey(providerWallet.publicKey));
  } catch (error) {
    console.log(error);
  }
};

// Extend the token lockup on realms indefinitely - 200 years
const resetLockUp = async () => {
  try {
    await vlock.resetLockup();
  } catch (error) {
    console.log(error);
  }
};

// Set a new Realms vote delegate
const setDelegate = async (delegateAddress: string) => {
  try {
    await vlock.setDelegate(delegateAddress);
  } catch (error) {
    console.log(error);
  }
};
```

## License

MIT
