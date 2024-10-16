import { PublicKey } from "@solana/web3.js";

declare module "vlock-sdk" {
  export class Vlock {
    constructor(
      program: any,
      realmName: string,
      realmVoterPublicKey: PublicKey,
      blzeTokenMint: PublicKey,
      votaBLZEMint: PublicKey
    );

    getVaultDetails(): Promise<any>;
    getStakeAccount(publicKey: PublicKey): Promise<any>;
    initializeProgram(): Promise<string>;
    initializeVaults(): Promise<string>;
    stakeTokens(amount: number, payer: PublicKey): Promise<string>;
    resetLockup(): Promise<string>;
    setDelegate(delegate: string): Promise<string>;
  }
}
