import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";

/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
export default class Vlock {
  // Network Configuration
  public network: string;
  public program: any;
  public programId: PublicKey;

  // Realm and Governance Identifiers
  public REALM_NAME: string;
  public REALMS_VOTER_PUBLIC_KEY: PublicKey;
  public GOVERNANCE_PROGRAM_ID: PublicKey;
  public GOVERNANCE_PDA: PublicKey;
  public GOVERNANCE_TOKEN_OWNER_RECORD_PDA: PublicKey;
  public REALM_PDA: PublicKey;
  public REALM_CONFIG_PDA: PublicKey;

  // Program Identifiers
  public QUARRY_PROGRAM_ID: PublicKey;
  public WRAPPER_PROGRAM_ID: PublicKey;
  public QUARRY_REDEEMER_PROGRAM_ID: PublicKey;
  public CLAIM_PROGRAM_ID: PublicKey;
  public VOTER_STAKE_REGISTRY_PROGRAM_ID: PublicKey;

  // Token Mint Identifiers
  public XYZ_TOKEN_MINT: PublicKey;
  public VOTA_XYZ_MINT: PublicKey;
  public REWARD_TOKEN_MINT: PublicKey;
  public IOU_TOKEN_MINT: PublicKey;

  // Vaults and Deposit Identifiers
  public VAULT_PDA: PublicKey;
  public DEPOSIT_VAULT_PDA: PublicKey;
  public COLLATERAL_VAULT_PDA: PublicKey;
  public REWARD_VAULT_PDA: PublicKey;
  public REWARDER_PDA: PublicKey;

  // PDA Identifiers for Voter and Stake
  public REGISTRAR_PDA: PublicKey;
  public VOTER_PDA: PublicKey;
  public VOTER_VAULT_PDA: PublicKey;
  public QUARRY_PDA: PublicKey;

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
  constructor(
    program: any,
    programId: PublicKey,
    network: string,
    realmName: string,
    realmVoterPublicKey: PublicKey,
    quarryPda: PublicKey,
    rewarderPda: PublicKey,
    xyzTokenMint: PublicKey,
    votaXyzMint: PublicKey,
    rewardTokenMint: PublicKey,
    iouTokenMint: PublicKey
  ) {
    this.program = program;
    this.programId = programId;
    this.network = network;
    this.REALM_NAME = realmName;
    this.REALMS_VOTER_PUBLIC_KEY = realmVoterPublicKey;
    this.QUARRY_PDA = quarryPda;
    this.XYZ_TOKEN_MINT = xyzTokenMint;
    this.VOTA_XYZ_MINT = votaXyzMint;
    this.REWARD_TOKEN_MINT = rewardTokenMint;
    this.IOU_TOKEN_MINT = iouTokenMint;
    this.REWARDER_PDA = rewarderPda;

    this.GOVERNANCE_PROGRAM_ID = new PublicKey(
      "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
    );

    this.VOTER_STAKE_REGISTRY_PROGRAM_ID = new PublicKey(
      "vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ"
    );

    this.QUARRY_PROGRAM_ID = new PublicKey(
      "QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB"
    );

    this.WRAPPER_PROGRAM_ID = new PublicKey(
      "QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV"
    );

    this.QUARRY_REDEEMER_PROGRAM_ID = new PublicKey(
      "QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9"
    );

    // Mainnet - rwRDmR2VVp8wJrU8rfavxYWJZrLe3aCStcAZrZcPZmQ
    this.CLAIM_PROGRAM_ID = new PublicKey(
      network.toLocaleLowerCase() === "mainnet"
        ? "rwRDmR2VVp8wJrU8rfavxYWJZrLe3aCStcAZrZcPZmQ"
        : "9mVaQcNNRDq93hUHV1CgLbJUDi9StkhnX6ynpNncGQGZ"
    );

    [this.VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      this.programId
    );

    [this.REWARD_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("reward_vault"), this.REWARD_TOKEN_MINT.toBuffer()],
      this.programId
    );

    [this.DEPOSIT_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("deposit_vault"), this.XYZ_TOKEN_MINT.toBuffer()],
      this.programId
    );

    [this.COLLATERAL_VAULT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("collateral_vault"), this.VOTA_XYZ_MINT.toBuffer()],
      this.programId
    );

    [this.REALM_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("governance"), Buffer.from(this.REALM_NAME)],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.GOVERNANCE_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("governance"),
        this.REALM_PDA.toBuffer(),
        this.XYZ_TOKEN_MINT.toBuffer(),
      ],
      this.GOVERNANCE_PROGRAM_ID
    );

    [this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("governance"),
        this.REALM_PDA.toBuffer(),
        this.XYZ_TOKEN_MINT.toBuffer(),
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
        this.XYZ_TOKEN_MINT.toBuffer(),
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
      [this.VOTER_PDA.toBuffer(), this.XYZ_TOKEN_MINT.toBuffer()],
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
        console.log(err);
        throw err;
      });

    return tx;
  }

  /**
   * Initializes the deposit and collateral vaults
   * @returns - The transaction signature
   */
  public async initializeVaults() {
    const tx = await (this.program.methods.initVaults() as any)
      .accounts({
        vault: this.VAULT_PDA,
        depositVault: this.DEPOSIT_VAULT_PDA,
        collateralVault: this.COLLATERAL_VAULT_PDA,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        depositMint: this.XYZ_TOKEN_MINT,
        collateralMint: this.VOTA_XYZ_MINT,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }

  /**
   * Initializes a reward vault
   * @param rewardMint - The reward mint that the vault should hold and distribute
   * @returns - The reward vault public key and the transaction signature
   */
  public async initializeRewardVaults() {
    const tx = await (this.program.methods.initRewardVaults() as any)
      .accounts({
        vault: this.VAULT_PDA,
        rewardVault: this.REWARD_VAULT_PDA,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        rewardMint: this.REWARD_TOKEN_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { rewardVault: this.REWARD_VAULT_PDA, tx };
  }

  /**
   * Locks tokens in the program and return votaXYZ tokens
   * @param amount - The amount of tokens to stake (Big Number)
   * @param payer - The payer's public key
   * @returns - The transaction signature
   */
  public async depositTokens(amount: number, payer: PublicKey) {
    const [STAKE_ACCOUNT_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_account"), payer.toBuffer()],
      this.program.programId
    );

    const realmsTokenVault = await getAssociatedTokenAddress(
      this.XYZ_TOKEN_MINT,
      this.VOTER_PDA,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const depositToken = await getAssociatedTokenAddress(
      this.XYZ_TOKEN_MINT,
      payer,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const collateralToken = await getAssociatedTokenAddress(
      this.VOTA_XYZ_MINT,
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
        payerDepositTokenAccount: depositToken, // The token account that the user deposits into
        payerCollateralTokenAccount: collateralToken, // The token account that the user receives as collateral
        payer: payer,
        depositMint: this.XYZ_TOKEN_MINT, // The token that the user deposits
        collateralMint: this.VOTA_XYZ_MINT, // The token that the user receives as collateral
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
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
        console.log(err);
        throw err;
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
        governanceTokenMint: this.XYZ_TOKEN_MINT,
        governanceVoteRecord: this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA,
        newGovernanceDelegate: new PublicKey(delegate),
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }

  /**
   * Creates iou mint wrapper for and iou rewarder
   * @param iouMint - The mint address to be used as the IOU token
   * @param mintWrapperPda - The pda for the mint wrapper
   * @param arbitraryBaseKeyPair - The arbitrary base key pair
   * @param hardCap - The hard cap for the iou rewarder - this is required by the wrapper program
   * @param decimals - The decimals for the iou token
   * @returns - The iou mint wrapper public key and the transaction signature
   */
  public async createMintWrapper(
    iouMint: PublicKey,
    mintWrapperPda: PublicKey,
    arbitraryBaseKeyPair: Keypair,
    hardCap: number,
    decimals: number
  ) {
    const hardCapAsBn = new BN(hardCap).mul(new BN(10).pow(new BN(decimals)));

    const tx = await (this.program.methods.createWrapper(hardCapAsBn) as any)
      .accounts({
        vault: this.VAULT_PDA,
        wrapperProgram: this.WRAPPER_PROGRAM_ID,
        mintWrapper: mintWrapperPda,
        admin: this.REALMS_VOTER_PUBLIC_KEY,
        tokenMint: iouMint,
        base: arbitraryBaseKeyPair.publicKey,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([arbitraryBaseKeyPair])
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { wrapper: mintWrapperPda, tx };
  }

  /**
   * Creates an iou rewarder
   * @param iouMintWrapper - The iou mint wrapper public key
   * @param iouTokenMint - The mint address of the token to be used as the iou token
   * @param arbitraryBaseKeyPair - The arbitrary base key pair
   * @param iouRewarderPda - The pda for the iou rewarder
   * @returns - The iou rewarder public key, the reward vault public key, and the transaction signature
   */
  public async createIouRewarder(
    iouMintWrapper: PublicKey,
    iouTokenMint: PublicKey,
    arbitraryBaseKeyPair: Keypair,
    iouRewarderPda: PublicKey
  ) {
    const claimFeeTokenAccount = await getAssociatedTokenAddress(
      this.REWARD_TOKEN_MINT,
      this.REALMS_VOTER_PUBLIC_KEY,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tx = await (this.program.methods.createRewarder() as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        rewarder: iouRewarderPda,
        initialAuthority: this.REWARD_VAULT_PDA,
        mintWrapper: iouMintWrapper,
        rewardsTokenMint: iouTokenMint,
        claimFeeTokenAccount: claimFeeTokenAccount,
        base: arbitraryBaseKeyPair.publicKey,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([arbitraryBaseKeyPair])
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { rewarder: iouRewarderPda, tx };
  }

  /**
   * Creates a quarry that rewards iou tokens from the rewarder
   * @param rewarder - The iou rewarder public key
   * @param quarryPda - The pda for the quarry
   * @returns - The quarry public key and the transaction signature
   */
  public async createQuarry(rewarder: PublicKey, quarryPda: PublicKey) {
    const tx = await (this.program.methods.createQuarry() as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        quarry: quarryPda,
        authority: this.REWARD_VAULT_PDA,
        rewarder: rewarder,
        rewardVault: this.REWARD_VAULT_PDA,
        rewardVaultTokenMint: this.REWARD_TOKEN_MINT, // The token that the reward vault holds not the iou tokens
        depositTokenMint: this.VOTA_XYZ_MINT,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { quarry: quarryPda, tx };
  }

  /**
   * Creates an iou token redeemer
   * @param iouTokenMint - The iou token mint
   *
   * @returns - The iou token redeemer public key and the transaction signature
   */
  public async createIouTokenRedeemer(iouTokenMint: PublicKey) {
    const [IOU_TOKEN_REDEEMER_PDA, bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("Redeemer"),
        iouTokenMint.toBuffer(),
        this.REWARD_TOKEN_MINT.toBuffer(),
      ],
      this.QUARRY_REDEEMER_PROGRAM_ID
    );

    const tx = await (this.program.methods.createRedeemer(bump) as any)
      .accounts({
        vault: this.VAULT_PDA,
        redeemerProgram: this.QUARRY_REDEEMER_PROGRAM_ID,
        redeemer: IOU_TOKEN_REDEEMER_PDA,
        iouMint: iouTokenMint,
        redemptionMint: this.REWARD_TOKEN_MINT,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { redeemer: IOU_TOKEN_REDEEMER_PDA, tx };
  }

  /**
   * Claim bribe rewards from the claim program and send them to the redeemer
   * and set the reward rate for the rewarder
   * @param rewarder - The rewarder public key - for setting the reward rate
   * @param escrowPda - The escrow pda for the claim program
   * @param redeemerTokenAccount - The redeemer token account for the reward token
   *
   * @returns - The transaction signature
   */
  public async claimRewards(
    rewarder: PublicKey,
    escrowPda: PublicKey,
    redeemerTokenAccount: PublicKey
  ) {
    const [CLAIM_PROGRAM_SIGNER_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("token-auth"), this.REWARD_VAULT_PDA.toBuffer()],
      this.CLAIM_PROGRAM_ID
    );

    const tx = await (this.program.methods.claimRewards() as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        claimProgram: this.CLAIM_PROGRAM_ID,
        usdcVault: this.REWARD_VAULT_PDA,
        claimProgramSignerPda: CLAIM_PROGRAM_SIGNER_PDA,
        claimProgramEscrowPda: escrowPda,
        redeemerTokenAccount: redeemerTokenAccount,
        rewarder: rewarder,
        rewardVault: this.REWARD_VAULT_PDA,
        tokenMint: this.REWARD_TOKEN_MINT,
        payer: this.REALMS_VOTER_PUBLIC_KEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }

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
  public async claimQuarryRewards(
    rewarder: PublicKey,
    mintWrapper: PublicKey,
    iouMint: PublicKey,
    userTokenAccount: PublicKey,
    minter: PublicKey,
    miner: PublicKey,
    quarry: PublicKey,
    payer: PublicKey
  ) {
    const claimFeeTokenAccount = await getAssociatedTokenAddress(
      iouMint,
      rewarder,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tx = await (this.program.methods.claimQuarryRewards() as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        mintWrapper: mintWrapper,
        mintWrapperProgram: this.WRAPPER_PROGRAM_ID,
        minter: minter,
        rewardsTokenMint: iouMint,
        rewardsTokenAccount: userTokenAccount,
        authority: payer,
        miner: miner,
        quarry: quarry,
        rewarder: rewarder,
        claimFeeTokenAccount: claimFeeTokenAccount,
        payer: payer,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }

  /**
   * Creates a miner for the given quarry - needed for the user to stake their votaXYZ tokens
   * @param quarry - The quarry public key
   * @param payer - The payer's public key
   * @param rewarder - The rewarder public key
   * @param minerTokenAccount - The miner token account for the miner
   * @returns - The transaction signature and the miner public key
   */
  public async createMiner(
    quarry: PublicKey,
    payer: PublicKey,
    rewarder: PublicKey,
    minerTokenAccount: PublicKey
  ) {
    const [MINER_PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("Miner"), quarry.toBuffer(), payer.toBuffer()],
      this.QUARRY_PROGRAM_ID
    );

    const tx = await (this.program.methods.createMiner() as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        miner: MINER_PDA,
        quarry: quarry,
        rewarder: rewarder,
        tokenMint: this.VOTA_XYZ_MINT,
        minerVault: minerTokenAccount,
        payer: payer,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { miner: MINER_PDA, tx };
  }

  /**
   * Creates a minter for the given quarry
   * @param payer - The payer's public key
   * @param rewarder - The rewarder public key
   * @param mintWrapperPDA - The mint wrapper pda
   * @returns - The transaction signature and the minter public key
   */
  public async createMinter(
    payer: PublicKey,
    rewarder: PublicKey,
    mintWrapperPDA: PublicKey
  ) {
    const [MINTER_WRAPPER_PDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("MintWrapperMinter"),
        mintWrapperPDA.toBuffer(),
        rewarder.toBuffer(),
      ],
      this.WRAPPER_PROGRAM_ID
    );

    const tx = await (this.program.methods.createMinter() as any)
      .accounts({
        vault: this.VAULT_PDA,
        mintWrapperProgram: this.WRAPPER_PROGRAM_ID,
        mintWrapper: mintWrapperPDA,
        admin: payer,
        newMinterAuthority: rewarder,
        minter: MINTER_WRAPPER_PDA,
        payer: payer,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return { minter: MINTER_WRAPPER_PDA, tx };
  }

  /**
   * Stakes votaXYZ tokens in the quarry
   * @param miner - The miner public key
   * @param quarry - The quarry public key
   * @param rewarder - The rewarder public key
   * @param amount - The amount to stake
   * @returns - The transaction signature
   */
  public async stakeTokens(
    miner: PublicKey,
    quarry: PublicKey,
    rewarder: PublicKey,
    amount: number,
    payer: PublicKey
  ) {
    const tokenAccount = await getAssociatedTokenAddress(
      this.VOTA_XYZ_MINT,
      payer,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const minerVault = await getAssociatedTokenAddress(
      this.VOTA_XYZ_MINT,
      miner,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tx = await (this.program.methods.createStake(amount) as any)
      .accounts({
        vault: this.VAULT_PDA,
        quarryProgram: this.QUARRY_PROGRAM_ID,
        miner: miner,
        quarry: quarry,
        minerVault: minerVault,
        rewarder: rewarder,
        payer: payer,
        tokenAccount: tokenAccount,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }

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
  public async redeemIouTokens(
    iouMint: PublicKey,
    amount: number,
    userIouTokenAccount: PublicKey,
    userRewardTokenAccount: PublicKey,
    redeemerVaultTokenAccount: PublicKey,
    payer: PublicKey
  ) {
    const [IOU_TOKEN_REDEEMER_PDA, bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("Redeemer"),
        iouMint.toBuffer(),
        this.REWARD_TOKEN_MINT.toBuffer(),
      ],
      this.QUARRY_REDEEMER_PROGRAM_ID
    );

    const tx = await (this.program.methods.redeemTokens(amount) as any)
      .accounts({
        vault: this.VAULT_PDA,
        redeemerProgram: this.QUARRY_REDEEMER_PROGRAM_ID,
        redeemer: IOU_TOKEN_REDEEMER_PDA,
        iouMint: iouMint,
        iouSource: userIouTokenAccount,
        redemptionVault: redeemerVaultTokenAccount,
        redemptionDestination: userRewardTokenAccount,
        payer: payer,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()
      .catch((err: any) => {
        console.log(err);
        throw err;
      });

    return tx;
  }
}
