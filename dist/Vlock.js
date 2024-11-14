"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
var Vlock = /** @class */ (function () {
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
    function Vlock(program, programId, network, realmName, realmVoterPublicKey, quarryPda, rewarderPda, xyzTokenMint, votaXyzMint, rewardTokenMint, iouTokenMint) {
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
        this.GOVERNANCE_PROGRAM_ID = new web3_js_1.PublicKey("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw");
        this.VOTER_STAKE_REGISTRY_PROGRAM_ID = new web3_js_1.PublicKey("vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ");
        this.QUARRY_PROGRAM_ID = new web3_js_1.PublicKey("QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB");
        this.WRAPPER_PROGRAM_ID = new web3_js_1.PublicKey("QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV");
        this.QUARRY_REDEEMER_PROGRAM_ID = new web3_js_1.PublicKey("QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9");
        // Mainnet - rwRDmR2VVp8wJrU8rfavxYWJZrLe3aCStcAZrZcPZmQ
        this.CLAIM_PROGRAM_ID = new web3_js_1.PublicKey(network.toLocaleLowerCase() === "mainnet"
            ? "rwRDmR2VVp8wJrU8rfavxYWJZrLe3aCStcAZrZcPZmQ"
            : "9mVaQcNNRDq93hUHV1CgLbJUDi9StkhnX6ynpNncGQGZ");
        this.VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault")], this.programId)[0];
        this.REWARD_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("reward_vault"), this.REWARD_TOKEN_MINT.toBuffer()], this.programId)[0];
        this.DEPOSIT_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("deposit_vault"), this.XYZ_TOKEN_MINT.toBuffer()], this.programId)[0];
        this.COLLATERAL_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("collateral_vault"), this.VOTA_XYZ_MINT.toBuffer()], this.programId)[0];
        this.REALM_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("governance"), Buffer.from(this.REALM_NAME)], this.GOVERNANCE_PROGRAM_ID)[0];
        this.GOVERNANCE_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("governance"),
            this.REALM_PDA.toBuffer(),
            this.XYZ_TOKEN_MINT.toBuffer(),
        ], this.GOVERNANCE_PROGRAM_ID)[0];
        this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("governance"),
            this.REALM_PDA.toBuffer(),
            this.XYZ_TOKEN_MINT.toBuffer(),
            this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
        ], this.GOVERNANCE_PROGRAM_ID)[0];
        this.REALM_CONFIG_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("realm-config"), this.REALM_PDA.toBuffer()], this.GOVERNANCE_PROGRAM_ID)[0];
        this.REGISTRAR_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            this.REALM_PDA.toBuffer(),
            Buffer.from("registrar"),
            this.XYZ_TOKEN_MINT.toBuffer(),
        ], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
        this.VOTER_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            this.REGISTRAR_PDA.toBuffer(),
            Buffer.from("voter"),
            this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
        ], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
        this.VOTER_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([this.VOTER_PDA.toBuffer(), this.XYZ_TOKEN_MINT.toBuffer()], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
    }
    /**
     *
     * Fetches the current vault details
     * @returns - The vault details
     */
    Vlock.prototype.getVaultDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.account.vault.fetch(this.VAULT_PDA)];
                    case 1:
                        vault = _a.sent();
                        return [2 /*return*/, vault];
                }
            });
        });
    };
    /**
     * Gets the stake account
     * @param publicKey - The public key of the user
     * @returns - The stake account
     */
    Vlock.prototype.getStakeAccount = function (publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var STAKE_ACCOUNT_PDA, stakeAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        STAKE_ACCOUNT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("stake_account"), publicKey.toBuffer()], this.program.programId)[0];
                        return [4 /*yield*/, this.program.account.stakeAccount.fetch(STAKE_ACCOUNT_PDA)];
                    case 1:
                        stakeAccount = _a.sent();
                        return [2 /*return*/, stakeAccount];
                }
            });
        });
    };
    /**
     * Initializes the program
     * @returns - The transaction signature
     */
    Vlock.prototype.initializeProgram = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.methods.init()
                            .accounts({
                            vault: this.VAULT_PDA,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                        })
                            .instruction()
                            .catch(function (err) {
                            console.log(err);
                            throw err;
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Initializes the deposit and collateral vaults
     * @returns - The transaction signature
     */
    Vlock.prototype.initializeVaults = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.methods.initVaults()
                            .accounts({
                            vault: this.VAULT_PDA,
                            depositVault: this.DEPOSIT_VAULT_PDA,
                            collateralVault: this.COLLATERAL_VAULT_PDA,
                            payer: this.REALMS_VOTER_PUBLIC_KEY,
                            depositMint: this.XYZ_TOKEN_MINT,
                            collateralMint: this.VOTA_XYZ_MINT,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                        })
                            .instruction()
                            .catch(function (err) {
                            console.log(err);
                            throw err;
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Initializes a reward vault
     * @param rewardMint - The reward mint that the vault should hold and distribute
     * @returns - The reward vault public key and the transaction signature
     */
    Vlock.prototype.initializeRewardVault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.methods.initRewardVaults()
                            .accounts({
                            vault: this.VAULT_PDA,
                            rewardVault: this.REWARD_VAULT_PDA,
                            payer: this.REALMS_VOTER_PUBLIC_KEY,
                            rewardMint: this.REWARD_TOKEN_MINT,
                            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                            systemProgram: web3_js_1.SystemProgram.programId,
                        })
                            .instruction()
                            .catch(function (err) {
                            console.log(err);
                            throw err;
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, { rewardVault: this.REWARD_VAULT_PDA, tx: tx }];
                }
            });
        });
    };
    /**
     * Locks tokens in the program and return votaXYZ tokens
     * @param amount - The amount of tokens to stake (Big Number)
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    Vlock.prototype.depositTokens = function (amount, payer) {
        return __awaiter(this, void 0, void 0, function () {
            var STAKE_ACCOUNT_PDA, realmsTokenVault, depositToken, collateralToken, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        STAKE_ACCOUNT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("stake_account"), payer.toBuffer()], this.program.programId)[0];
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.XYZ_TOKEN_MINT, this.VOTER_PDA, true, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
                    case 1:
                        realmsTokenVault = _a.sent();
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.XYZ_TOKEN_MINT, payer, false, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
                    case 2:
                        depositToken = _a.sent();
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.VOTA_XYZ_MINT, payer, false, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
                    case 3:
                        collateralToken = _a.sent();
                        return [4 /*yield*/, this.program.methods.deposit(amount)
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
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                            })
                                .instruction()
                                .catch(function (err) {
                                console.log(err);
                                throw err;
                            })];
                    case 4:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Resets the lockup period to 200 years
     * @returns - The transaction signature
     */
    Vlock.prototype.resetLockup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.methods.resetLockup()
                            .accounts({
                            vsrProgram: this.VOTER_STAKE_REGISTRY_PROGRAM_ID,
                            registrar: this.REGISTRAR_PDA,
                            realmsVoteAccount: this.VOTER_PDA,
                            payer: this.REALMS_VOTER_PUBLIC_KEY,
                        })
                            .instruction()
                            .catch(function (err) {
                            console.log(err);
                            throw err;
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     *
     * @param delegate - The new delegate address
     * @returns - The transaction signature
     */
    Vlock.prototype.setDelegate = function (delegate) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.methods.delegate()
                            .accounts({
                            governanceProgram: this.GOVERNANCE_PROGRAM_ID,
                            realmsVoteAccount: this.VOTER_PDA,
                            realm: this.REALM_PDA,
                            governanceTokenMint: this.XYZ_TOKEN_MINT,
                            governanceVoteRecord: this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA,
                            newGovernanceDelegate: new web3_js_1.PublicKey(delegate),
                            payer: this.REALMS_VOTER_PUBLIC_KEY,
                            systemProgram: web3_js_1.SystemProgram.programId,
                        })
                            .instruction()
                            .catch(function (err) {
                            console.log(err);
                            throw err;
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Creates an iou token redeemer
     * @param iouTokenMint - The iou token mint
     *
     * @returns - The iou token redeemer public key and the transaction signature
     */
    Vlock.prototype.createIouTokenRedeemer = function (iouTokenMint) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, IOU_TOKEN_REDEEMER_PDA, bump, tx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = web3_js_1.PublicKey.findProgramAddressSync([
                            Buffer.from("Redeemer"),
                            iouTokenMint.toBuffer(),
                            this.REWARD_TOKEN_MINT.toBuffer(),
                        ], this.QUARRY_REDEEMER_PROGRAM_ID), IOU_TOKEN_REDEEMER_PDA = _a[0], bump = _a[1];
                        return [4 /*yield*/, this.program.methods.createRedeemer(bump)
                                .accounts({
                                vault: this.VAULT_PDA,
                                redeemerProgram: this.QUARRY_REDEEMER_PROGRAM_ID,
                                redeemer: IOU_TOKEN_REDEEMER_PDA,
                                iouMint: iouTokenMint,
                                redemptionMint: this.REWARD_TOKEN_MINT,
                                payer: this.REALMS_VOTER_PUBLIC_KEY,
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()
                                .catch(function (err) {
                                console.log(err);
                                throw err;
                            })];
                    case 1:
                        tx = _b.sent();
                        return [2 /*return*/, { redeemer: IOU_TOKEN_REDEEMER_PDA, tx: tx }];
                }
            });
        });
    };
    /**
     * Claim bribe rewards from the claim program and send them to the redeemer
     * and set the reward rate for the rewarder
     * @param rewarder - The rewarder public key - for setting the reward rate
     * @param escrowPda - The escrow pda for the claim program
     * @param redeemerTokenAccount - The redeemer token account for the reward token
     *
     * @returns - The transaction signature
     */
    Vlock.prototype.claimRewards = function (rewarder, escrowPda, redeemerTokenAccount) {
        return __awaiter(this, void 0, void 0, function () {
            var CLAIM_PROGRAM_SIGNER_PDA, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CLAIM_PROGRAM_SIGNER_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("token-auth"), this.REWARD_VAULT_PDA.toBuffer()], this.CLAIM_PROGRAM_ID)[0];
                        return [4 /*yield*/, this.program.methods.claimRewards()
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
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                            })
                                .instruction()
                                .catch(function (err) {
                                console.log(err);
                                throw err;
                            })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
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
    Vlock.prototype.redeemIouTokens = function (iouMint, amount, userIouTokenAccount, userRewardTokenAccount, redeemerVaultTokenAccount, payer) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, IOU_TOKEN_REDEEMER_PDA, bump, tx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = web3_js_1.PublicKey.findProgramAddressSync([
                            Buffer.from("Redeemer"),
                            iouMint.toBuffer(),
                            this.REWARD_TOKEN_MINT.toBuffer(),
                        ], this.QUARRY_REDEEMER_PROGRAM_ID), IOU_TOKEN_REDEEMER_PDA = _a[0], bump = _a[1];
                        return [4 /*yield*/, this.program.methods.redeemTokens(amount)
                                .accounts({
                                vault: this.VAULT_PDA,
                                redeemerProgram: this.QUARRY_REDEEMER_PROGRAM_ID,
                                redeemer: IOU_TOKEN_REDEEMER_PDA,
                                iouMint: iouMint,
                                iouSource: userIouTokenAccount,
                                redemptionVault: redeemerVaultTokenAccount,
                                redemptionDestination: userRewardTokenAccount,
                                payer: payer,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()
                                .catch(function (err) {
                                console.log(err);
                                throw err;
                            })];
                    case 1:
                        tx = _b.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    return Vlock;
}());
exports.default = Vlock;
