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
  xyzTokenMint, // The public key of the deposit token mint.
  votaXyzMint, // The public key of the votaXYZ token mint.
  rewardTokenMint // The public key of the reward token mint claimed by the program and sent to the redeemer. (USDC, META, BLZE, etc.)
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

// Stake XYZ tokens and receive votaXYZ tokens
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

// Create a mint wrapper for IOU tokens
const createIouMintWrapper = async (
  iouMint: PublicKey,
  mintWrapperPda: PublicKey,
  arbitraryBaseKeyPair: Keypair,
  hardCap: number,
  decimals: number
) => {
  try {
    const { wrapper, tx } = await vlock.createMintWrapper(
      iouMint,
      mintWrapperPda,
      arbitraryBaseKeyPair,
      hardCap,
      decimals
    );
    console.log("Mint Wrapper PDA:", wrapper.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating mint wrapper:", error);
  }
};

// Create an IOU rewarder
const createIouRewarder = async (
  iouMintWrapper: PublicKey,
  iouTokenMint: PublicKey,
  arbitraryBaseKeyPair: Keypair,
  iouRewarderPda: PublicKey
) => {
  try {
    const { rewarder, tx } = await vlock.createIouRewarder(
      iouMintWrapper,
      iouTokenMint,
      arbitraryBaseKeyPair,
      iouRewarderPda
    );
    console.log("IOU Rewarder PDA:", rewarder.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating IOU rewarder:", error);
  }
};

// Create a quarry for rewarding IOU tokens
const createQuarry = async (rewarder: PublicKey, quarryPda: PublicKey) => {
  try {
    const { quarry, tx } = await vlock.createQuarry(rewarder, quarryPda);
    console.log("Quarry PDA:", quarry.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating quarry:", error);
  }
};

// Create an IOU token redeemer
const createIouTokenRedeemer = async (iouTokenMint: PublicKey) => {
  try {
    const { redeemer, tx } = await vlock.createIouTokenRedeemer(iouTokenMint);
    console.log("IOU Token Redeemer PDA:", redeemer.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating IOU token redeemer:", error);
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

// Claim rewards from a quarry
const claimQuarryRewards = async (
  rewarder: PublicKey,
  mintWrapper: PublicKey,
  iouMint: PublicKey,
  userTokenAccount: PublicKey,
  minter: PublicKey,
  miner: PublicKey,
  quarry: PublicKey,
  payer: PublicKey
) => {
  try {
    const tx = await vlock.claimQuarryRewards(
      rewarder,
      mintWrapper,
      iouMint,
      userTokenAccount,
      minter,
      miner,
      quarry,
      payer
    );
    console.log("Claim Quarry Rewards Transaction Signature:", tx);
  } catch (error) {
    console.error("Error claiming quarry rewards:", error);
  }
};

// Create a miner for a quarry
const createQuarryMiner = async (
  quarry: PublicKey,
  payer: PublicKey,
  rewarder: PublicKey,
  minerTokenAccount: PublicKey
) => {
  try {
    const { miner, tx } = await vlock.createMiner(
      quarry,
      payer,
      rewarder,
      minerTokenAccount
    );
    console.log("Miner PDA:", miner.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating miner:", error);
  }
};

// Create a minter for the mint wrapper
const createMintWrapperMinter = async (
  payer: PublicKey,
  rewarder: PublicKey,
  mintWrapperPDA: PublicKey
) => {
  try {
    const { minter, tx } = await vlock.createMinter(
      payer,
      rewarder,
      mintWrapperPDA
    );
    console.log("Minter PDA:", minter.toBase58());
    console.log("Transaction Signature:", tx);
  } catch (error) {
    console.error("Error creating minter:", error);
  }
};

// Stake votaXYZ tokens in a quarry
const stakeVotaXyzTokens = async (
  miner: PublicKey,
  quarry: PublicKey,
  rewarder: PublicKey,
  amount: number,
  payer: PublicKey
) => {
  try {
    const tx = await vlock.stakeTokens(miner, quarry, rewarder, amount, payer);
    console.log("Stake Tokens Transaction Signature:", tx);
  } catch (error) {
    console.error("Error staking tokens:", error);
  }
};

// Get detailed information about a rewarder
const displayRewarderInfo = async (rewarder: PublicKey) => {
  try {
    const rewarderInfo = await vlock.getRewarderInfo(rewarder);
    console.log("Rewarder Information:", rewarderInfo);
  } catch (error) {
    console.error("Error fetching rewarder information:", error);
  }
};
```

# COMPLETE EXAMPLE

```ts

import { Vlock } from "vlock-program-sdk";
import { Keypair, PublicKey } from "@solana/web3.js";

// Initialize the Vlock instance
const initializeVlock = () => {
  const program = /* Initialize your program instance */;
  const programId = new PublicKey("YourProgramID");
  const network = "devnet"; // or "mainnet"
  const realmName = "YourRealm";
  const realmVoterPublicKey = new PublicKey("RealmVoterPublicKey");
  const xyzTokenMint = new PublicKey("XYZTokenMintAddress");
  const votaXyzMint = new PublicKey("VotaXYZTokenMintAddress");
  const rewardTokenMint = new PublicKey("RewardTokenMintAddress");

  const vlock = new Vlock(
    program,
    programId,
    network,
    realmName,
    realmVoterPublicKey,
    xyzTokenMint,
    votaXyzMint,
    rewardTokenMint
  );

  return vlock;
};

const main = async () => {
  const vlock = initializeVlock();

  // Initialize the program
  await vlock.initializeProgram();

  // Initialize vaults
  await vlock.initializeVaults();

  // Initialize a reward vault
  const rewardMint = new PublicKey("RewardMintAddress");
  await vlock.initializeRewardVault(rewardMint);

  // Deposit tokens
  const payer = new PublicKey("PayerPublicKey");
  await vlock.depositTokens(1000, payer);

  // Create mint wrapper
  const iouMint = new PublicKey("IouMintAddress");
  const mintWrapperPda = new PublicKey("MintWrapperPDA");
  const arbitraryBaseKeyPair = Keypair.generate();
  await vlock.createMintWrapper(iouMint, mintWrapperPda, arbitraryBaseKeyPair, 5000, 6);

  // Create IOU rewarder
  const iouRewarderPda = new PublicKey("IouRewarderPDA");
  await vlock.createIouRewarder(mintWrapperPda, iouMint, arbitraryBaseKeyPair, iouRewarderPda);

  // Create quarry
  const quarryPda = new PublicKey("QuarryPDA");
  await vlock.createQuarry(iouRewarderPda, quarryPda);

  // Create IOU token redeemer
  await vlock.createIouTokenRedeemer(iouMint);

  // Stake tokens
  const miner = new PublicKey("MinerPDA");
  const quarry = quarryPda;
  const rewarder = iouRewarderPda;
  const amount = 1000;
  await vlock.stakeTokens(miner, quarry, rewarder, amount, payer);

  // Claim rewards
  const escrowPda = new PublicKey("EscrowPDA");
  const redeemerTokenAccount = new PublicKey("RedeemerTokenAccount");
  await vlock.claimRewards(rewarder, escrowPda, redeemerTokenAccount);

  // Get vault details
  await vlock.getVaultDetails();

  // Get rewarder info
  await vlock.getRewarderInfo(rewarder);
};

main().catch((err) => {
  console.error(err);
});
```

## License

MIT
