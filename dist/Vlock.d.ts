import { Keypair, PublicKey } from "@solana/web3.js";
/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
export default class Vlock {
    network: string;
    program: any;
    programId: PublicKey;
    REALM_NAME: string;
    REALMS_VOTER_PUBLIC_KEY: PublicKey;
    GOVERNANCE_PROGRAM_ID: PublicKey;
    GOVERNANCE_PDA: PublicKey;
    GOVERNANCE_TOKEN_OWNER_RECORD_PDA: PublicKey;
    REALM_PDA: PublicKey;
    REALM_CONFIG_PDA: PublicKey;
    QUARRY_PROGRAM_ID: PublicKey;
    WRAPPER_PROGRAM_ID: PublicKey;
    QUARRY_REDEEMER_PROGRAM_ID: PublicKey;
    CLAIM_PROGRAM_ID: PublicKey;
    VOTER_STAKE_REGISTRY_PROGRAM_ID: PublicKey;
    XYZ_TOKEN_MINT: PublicKey;
    VOTA_XYZ_MINT: PublicKey;
    REWARD_TOKEN_MINT: PublicKey;
    IOU_TOKEN_MINT: PublicKey;
    VAULT_PDA: PublicKey;
    DEPOSIT_VAULT_PDA: PublicKey;
    COLLATERAL_VAULT_PDA: PublicKey;
    REWARD_VAULT_PDA: PublicKey;
    REWARDER_PDA: PublicKey;
    REGISTRAR_PDA: PublicKey;
    VOTER_PDA: PublicKey;
    VOTER_VAULT_PDA: PublicKey;
    QUARRY_PDA: PublicKey;
    /**
     * Constructor for the Vlock class
     * @param program - The program instance
     * @param programId - The program ID
     * @param network - The network (mainnet or devnet)
     * @param realmName - The name of the realm
     * @param realmVoterPublicKey - The public key of the realm voter
     * @param quarryPda - The quarry pda that rewards
     * @param rewarderPda - The rewarder pda that distributes rewards
     * @param xyzTokenMint - The public key of the deposit token mint
     * @param votaXyzMint - The public key of the collateral token mint
     * @param rewardTokenMint - The public key of the reward token mint
     * @param iouTokenMint - The public key of the iou token mint
     */
    constructor(program: any, programId: PublicKey, network: string, realmName: string, realmVoterPublicKey: PublicKey, quarryPda: PublicKey, rewarderPda: PublicKey, xyzTokenMint: PublicKey, votaXyzMint: PublicKey, rewardTokenMint: PublicKey, iouTokenMint: PublicKey);
    /**
     *
     * Fetches the current vault details
     * @returns - The vault details
     */
    getVaultDetails(): Promise<any>;
    /**
     * Gets the stake account
     * @param publicKey - The public key of the user
     * @returns - The stake account
     */
    getStakeAccount(publicKey: PublicKey): Promise<any>;
    /**
     * Initializes the program
     * @returns - The transaction signature
     */
    initializeProgram(): Promise<any>;
    /**
     * Initializes the deposit and collateral vaults
     * @returns - The transaction signature
     */
    initializeVaults(): Promise<any>;
    /**
     * Initializes a reward vault
     * @param rewardMint - The reward mint that the vault should hold and distribute
     * @returns - The reward vault public key and the transaction signature
     */
    initializeRewardVaults(): Promise<{
        rewardVault: PublicKey;
        tx: any;
    }>;
    /**
     * Locks tokens in the program and return votaXYZ tokens
     * @param amount - The amount of tokens to stake (Big Number)
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    depositTokens(amount: number, payer: PublicKey): Promise<any>;
    /**
     * Resets the lockup period to 200 years
     * @returns - The transaction signature
     */
    resetLockup(): Promise<any>;
    /**
     *
     * @param delegate - The new delegate address
     * @returns - The transaction signature
     */
    setDelegate(delegate: string): Promise<any>;
    /**
     * Creates iou mint wrapper for and iou rewarder
     * @param iouMint - The mint address to be used as the IOU token
     * @param mintWrapperPda - The pda for the mint wrapper
     * @param arbitraryBaseKeyPair - The arbitrary base key pair
     * @param hardCap - The hard cap for the iou rewarder - this is required by the wrapper program
     * @param decimals - The decimals for the iou token
     * @returns - The iou mint wrapper public key and the transaction signature
     */
    createMintWrapper(iouMint: PublicKey, mintWrapperPda: PublicKey, arbitraryBaseKeyPair: Keypair, hardCap: number, decimals: number): Promise<{
        wrapper: PublicKey;
        tx: any;
    }>;
    /**
     * Creates an iou rewarder
     * @param iouMintWrapper - The iou mint wrapper public key
     * @param iouTokenMint - The mint address of the token to be used as the iou token
     * @param arbitraryBaseKeyPair - The arbitrary base key pair
     * @param iouRewarderPda - The pda for the iou rewarder
     * @returns - The iou rewarder public key, the reward vault public key, and the transaction signature
     */
    createIouRewarder(iouMintWrapper: PublicKey, iouTokenMint: PublicKey, arbitraryBaseKeyPair: Keypair, iouRewarderPda: PublicKey): Promise<{
        rewarder: PublicKey;
        tx: any;
    }>;
    /**
     * Creates a quarry that rewards iou tokens from the rewarder
     * @param rewarder - The iou rewarder public key
     * @param quarryPda - The pda for the quarry
     * @returns - The quarry public key and the transaction signature
     */
    createQuarry(rewarder: PublicKey, quarryPda: PublicKey): Promise<{
        quarry: PublicKey;
        tx: any;
    }>;
    /**
     * Creates an iou token redeemer
     * @param iouTokenMint - The iou token mint
     *
     * @returns - The iou token redeemer public key and the transaction signature
     */
    createIouTokenRedeemer(iouTokenMint: PublicKey): Promise<{
        redeemer: PublicKey;
        tx: any;
    }>;
    /**
     * Claim bribe rewards from the claim program and send them to the redeemer
     * and set the reward rate for the rewarder
     * @param rewarder - The rewarder public key - for setting the reward rate
     * @param escrowPda - The escrow pda for the claim program
     * @param redeemerTokenAccount - The redeemer token account for the reward token
     *
     * @returns - The transaction signature
     */
    claimRewards(rewarder: PublicKey, escrowPda: PublicKey, redeemerTokenAccount: PublicKey): Promise<any>;
    /**
     * Claim rewards from the claim program and sends them to the redeemer
     * @param rewarder - The rewarder public key
     * @param mintWrapper - The mint wrapper public key
     * @param iouMint - The iou token mint
     * @param userTokenAccount - The user token account for the reward token
     * @param minter - The minter public key
     * @param miner - The miner public key
     * @param quarry - The quarry public key
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    claimQuarryRewards(rewarder: PublicKey, mintWrapper: PublicKey, iouMint: PublicKey, userTokenAccount: PublicKey, minter: PublicKey, miner: PublicKey, quarry: PublicKey, payer: PublicKey): Promise<any>;
    /**
     * Creates a miner for the given quarry - needed for the user to stake their votaXYZ tokens
     * @param quarry - The quarry public key
     * @param payer - The payer's public key
     * @param rewarder - The rewarder public key
     * @param minerTokenAccount - The miner token account for the miner
     * @returns - The transaction signature and the miner public key
     */
    createMiner(quarry: PublicKey, payer: PublicKey, rewarder: PublicKey, minerTokenAccount: PublicKey): Promise<{
        miner: PublicKey;
        tx: any;
    }>;
    /**
     * Creates a minter for the given quarry
     * @param payer - The payer's public key
     * @param rewarder - The rewarder public key
     * @param mintWrapperPDA - The mint wrapper pda
     * @returns - The transaction signature and the minter public key
     */
    createMinter(payer: PublicKey, rewarder: PublicKey, mintWrapperPDA: PublicKey): Promise<{
        minter: PublicKey;
        tx: any;
    }>;
    /**
     * Stakes votaXYZ tokens in the quarry
     * @param miner - The miner public key
     * @param quarry - The quarry public key
     * @param rewarder - The rewarder public key
     * @param amount - The amount to stake
     * @returns - The transaction signature
     */
    stakeTokens(miner: PublicKey, quarry: PublicKey, rewarder: PublicKey, amount: number, payer: PublicKey): Promise<any>;
    /**
     * Redeem iou tokens for the reward token
     * @param iouMint - The iou token mint
     * @param amount - The amount to redeem
     * @param userIouTokenAccount - The user's iou token account
     * @param userRewardTokenAccount - The user's reward token account
     * @param redeemerVaultTokenAccount   - The redeemer token account
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    redeemIouTokens(iouMint: PublicKey, amount: number, userIouTokenAccount: PublicKey, userRewardTokenAccount: PublicKey, redeemerVaultTokenAccount: PublicKey, payer: PublicKey): Promise<any>;
}
