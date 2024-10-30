import { PublicKey } from "@solana/web3.js";
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
    initializeRewardVault(): Promise<{
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
