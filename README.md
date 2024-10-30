# Vlock SDK

A lightweight SDK for interacting with the vlock solana program.

## Installation

```bash
npm install vlock-program-sdk
```

## Usage

```ts
import { Vlock } from "vlock-program-sdk";

const program = new Program(idl, provider as AnchorProvider);

const vlock = new Vlock(
  program, // The program instance created with Anchor.
  programId, // The program ID.
  network, // The network to use. (mainnet or devnet)
  realmName, // The name of the realm.
  realmVoterPublicKey, // The public key of the realm voter (admin wallet).
  quarryPda, // The pda for the quarry
  rewarderPda, // The pda for the rewarder
  xyzTokenMint, // The public key of the deposit token mint.
  votaXyzMint, // The public key of the votaXYZ token mint.
  rewardTokenMint, // The public key of the reward token mint claimed by the program and sent to the redeemer. (USDC, META, BLZE, etc.)
  iouTokenMint // The public key of the iou token mint.
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

// Fetch vault details
const fetchVaultDetails = async () => {
  try {
    const vaultDetails = await vlock.getVaultDetails();
    console.log("Vault Details:", vaultDetails);
  } catch (error) {
    console.error("Error fetching vault details:", error);
  }
};

// Deposit tokens into the vault
const depositXYZTokens = async (amount: number, payer: PublicKey) => {
  try {
    const tx = await vlock.depositTokens(amount, payer);
    console.log("Deposit Transaction Signature:", tx);
  } catch (error) {
    console.error("Error depositing tokens:", error);
  }
};

// Redeem IOU tokens and receive reward tokens
const redeemTokens = async (
  amount: number,
  userIouTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  payer: PublicKey
) => {
  try {
    const tx = await vlock.redeemTokens(
      amount,
      userIouTokenAccount,
      userRewardTokenAccount,
      payer
    );
    console.log("Redeem Transaction Signature:", tx);
  } catch (error) {
    console.error("Error redeeming tokens:", error);
  }
};

// Claim rewards and send to redeemer
const claimProgramRewards = async (
  rewarder: PublicKey,
  escrowPda: PublicKey,
  redeemerTokenAccount: PublicKey
) => {
  try {
    const tx = await vlock.claimRewards(
      rewarder,
      escrowPda,
      redeemerTokenAccount
    );
    console.log("Claim Rewards Transaction Signature:", tx);
  } catch (error) {
    console.error("Error claiming rewards:", error);
  }
};
```

## License

MIT

```

```
