import { PublicKey } from "@solana/web3.js";
/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
export default class Vlock {
    program: any;
    REALM_NAME: string;
    REALMS_VOTER_PUBLIC_KEY: PublicKey;
    GOVERNANCE_PROGRAM_ID: PublicKey;
    VOTER_STAKE_REGISTRY_PROGRAM_ID: PublicKey;
    BLZETokenMint: PublicKey;
    votaBLZEMint: PublicKey;
    VAULT_PDA: PublicKey;
    DEPOSIT_VAULT_PDA: PublicKey;
    COLLATERAL_VAULT_PDA: PublicKey;
    REALM_PDA: PublicKey;
    GOVERNANCE_PDA: PublicKey;
    GOVERNANCE_TOKEN_OWNER_RECORD_PDA: PublicKey;
    REALM_CONFIG_PDA: PublicKey;
    REGISTRAR_PDA: PublicKey;
    VOTER_PDA: PublicKey;
    VOTER_VAULT_PDA: PublicKey;
    /**
     * Constructor for the Vlock class
     * @param program - The program instance
     * @param realmName - The name of the realm
     * @param realmVoterPublicKey - The public key of the realm voter
     * @param blzeTokenMint - The public key of the BLZE token mint
     * @param votaBLZEMint - The public key of the votaBLZE token mint
     */
    constructor(program: any, realmName: string, realmVoterPublicKey: PublicKey, blzeTokenMint: PublicKey, votaBLZEMint: PublicKey);
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
     * Initializes the vaults
     * @returns - The transaction signature
     */
    initializeVaults(): Promise<any>;
    /**
     * Locks tokens in the program and return votaBLZE tokens
     * @param amount - The amount of tokens to stake (Big Number)
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    stakeTokens(amount: number, payer: PublicKey): Promise<any>;
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
}
