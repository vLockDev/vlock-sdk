import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import idl from "./idl.json";

/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
export default class Vlock {
  public program: any;
  public REALM_NAME: string;
  public REALMS_VOTER_PUBLIC_KEY: PublicKey;
  public GOVERNANCE_PROGRAM_ID: PublicKey;
  public VOTER_STAKE_REGISTRY_PROGRAM_ID: PublicKey;
  public BLZETokenMint: PublicKey;
  public votaBLZEMint: PublicKey;
  public VAULT_PDA: PublicKey;
  public DEPOSIT_VAULT_PDA: PublicKey;
  public COLLATERAL_VAULT_PDA: PublicKey;
  public REALM_PDA: PublicKey;
  public GOVERNANCE_PDA: PublicKey;
  public GOVERNANCE_TOKEN_OWNER_RECORD_PDA: PublicKey;
  public REALM_CONFIG_PDA: PublicKey;
  public REGISTRAR_PDA: PublicKey;
  public VOTER_PDA: PublicKey;
  public VOTER_VAULT_PDA: PublicKey;

  /**
   * Constructor for the Vlock class
   * @param program - The program instance
   * @param realmName - The name of the realm
   * @param realmVoterPublicKey - The public key of the realm voter
   * @param blzeTokenMint - The public key of the BLZE token mint
   * @param votaBLZEMint - The public key of the votaBLZE token mint
   */
  constructor(
    program: any,
    realmName: string,
    realmVoterPublicKey: PublicKey,
    blzeTokenMint: PublicKey,
    votaBLZEMint: PublicKey
  ) {
    this.program = program;
    this.REALM_NAME = realmName;
    this.REALMS_VOTER_PUBLIC_KEY = realmVoterPublicKey;
    this.BLZETokenMint = blzeTokenMint;
    this.votaBLZEMint = votaBLZEMint;

    this.GOVERNANCE_PROGRAM_ID = new PublicKey(
      "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
    );

    this.VOTER_STAKE_REGISTRY_PROGRAM_ID = new PublicKey(
      "vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ"
    );

    [this.VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      new PublicKey(idl.address)
    );

    [this.DEPOSIT_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("deposit_vault"), this.BLZETokenMint.toBuffer()],
      new PublicKey(idl.address)
    );

    [this.COLLATERAL_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("collateral_vault"), this.votaBLZEMint.toBuffer()],
      new PublicKey(idl.address)
    );

    [this.REALM_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("governance", "utf-8"),
        Buffer.from(this.REALM_NAME, "utf-8"),
      ],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.GOVERNANCE_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("governance"),
        this.REALM_PDA.toBuffer(),
        this.BLZETokenMint.toBuffer(),
      ],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("governance"),
        this.REALM_PDA.toBuffer(),
        this.BLZETokenMint.toBuffer(),
        this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
      ],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.REALM_CONFIG_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("realm-config"), this.REALM_PDA.toBuffer()],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.REGISTRAR_PDA] = PublicKey.findProgramAddressSync(
      [
        this.REALM_PDA.toBuffer(),
        Buffer.from("registrar"),
        this.BLZETokenMint.toBuffer(),
      ],
      this.VOTER_STAKE_REGISTRY_PROGRAM_ID
    );

    [this.VOTER_PDA] = PublicKey.findProgramAddressSync(
      [
        this.REGISTRAR_PDA.toBuffer(),
        Buffer.from("voter"),
        this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
      ],
      this.VOTER_STAKE_REGISTRY_PROGRAM_ID
    );

    [this.VOTER_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [this.VOTER_PDA.toBuffer(), this.BLZETokenMint.toBuffer()],
      this.VOTER_STAKE_REGISTRY_PROGRAM_ID
    );
  }

  /**
   *
   * Fetches the current vault details
   * @returns - The vault details
   */
  public async getVaultDetails() {
    const vault: any = await this.program.account.vault.fetch(this.VAULT_PDA);

    return vault;
  }

  /**
   * Gets the stake account
   * @param publicKey - The public key of the user
   * @returns - The stake account
   */
  public async getStakeAccount(publicKey: PublicKey) {
    const [STAKE_ACCOUNT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_account"), publicKey.toBuffer()],
      this.program.programId
    );

    const stakeAccount: any = await this.program.account.stakeAccount.fetch(
      STAKE_ACCOUNT_PDA
    );

    return stakeAccount;
  }

  /**
   * Initializes the program
   * @returns - The transaction signature
   */
  public async initializeProgram() {
    const tx = await (this.program.methods.init() as any)
      .accounts({
        vault: this.VAULT_PDA,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        return console.log(err);
      });

    return tx;
  }

  /**
   * Initializes the vaults
   * @returns - The transaction signature
   */
  public async initializeVaults() {
    const tx = await (this.program.methods.initVaults() as any)
      .accounts({
        vault: this.VAULT_PDA,
        depositVault: this.DEPOSIT_VAULT_PDA,
        collateralVault: this.COLLATERAL_VAULT_PDA,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        depositMint: this.BLZETokenMint,
        collateralMint: this.votaBLZEMint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        return console.log(err);
      });

    return tx;
  }

  /**
   * Locks tokens in the program and return votaBLZE tokens
   * @param amount - The amount of tokens to stake (Big Number)
   * @param payer - The payer's public key
   * @returns - The transaction signature
   */
  public async stakeTokens(amount: number, payer: PublicKey) {
    const [STAKE_ACCOUNT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_account"), payer.toBuffer()],
      this.program.programId
    );

    const realmsTokenVault = await getAssociatedTokenAddress(
      this.BLZETokenMint,
      this.VOTER_PDA,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const depositToken = await getAssociatedTokenAddress(
      this.BLZETokenMint,
      payer,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const collateralToken = await getAssociatedTokenAddress(
      this.votaBLZEMint,
      payer,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tx = await (this.program.methods.deposit(amount) as any)
      .accounts({
        vsrProgram: this.VOTER_STAKE_REGISTRY_PROGRAM_ID,
        registrar: this.REGISTRAR_PDA,
        realmsVoteAccount: this.VOTER_PDA,
        vault: this.VAULT_PDA,
        stakeAccount: STAKE_ACCOUNT_PDA,
        depositVault: this.DEPOSIT_VAULT_PDA,
        collateralVault: this.COLLATERAL_VAULT_PDA,
        realmsTokenVault: realmsTokenVault,
        payerDepositTokenAccount: depositToken,
        payerCollateralTokenAccount: collateralToken,
        payer: payer,
        depositMint: this.BLZETokenMint,
        collateralMint: this.votaBLZEMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        return console.log(err);
      });

    return tx;
  }

  /**
   * Resets the lockup period to 200 years
   * @returns - The transaction signature
   */
  public async resetLockup() {
    const tx = await (this.program.methods.resetLockup() as any)
      .accounts({
        vsrProgram: this.VOTER_STAKE_REGISTRY_PROGRAM_ID,
        registrar: this.REGISTRAR_PDA,
        realmsVoteAccount: this.VOTER_PDA,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
      })
      .rpc()
      .catch((err: any) => {
        return console.log(err);
      });

    return tx;
  }

  /**
   *
   * @param delegate - The new delegate address
   * @returns - The transaction signature
   */
  public async setDelegate(delegate: string) {
    const tx = await (this.program.methods.delegate() as any)
      .accounts({
        governanceProgram: this.GOVERNANCE_PROGRAM_ID,
        realmsVoteAccount: this.VOTER_PDA,
        realm: this.REALM_PDA,
        governanceTokenMint: this.BLZETokenMint,
        governanceVoteRecord: this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA,
        newGovernanceDelegate: new PublicKey(delegate),
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        return console.log(err);
      });

    return tx;
  }
}
