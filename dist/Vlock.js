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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var idl_json_1 = __importDefault(require("./idl.json"));
/**
 * Vlock class
 * @class
 * @description - The Vlock class is used to interact with the Vlock program
 */
var Vlock = /** @class */ (function () {
    /**
     * Constructor for the Vlock class
     * @param program - The program instance
     * @param realmName - The name of the realm
     * @param realmVoterPublicKey - The public key of the realm voter
     * @param blzeTokenMint - The public key of the BLZE token mint
     * @param votaBLZEMint - The public key of the votaBLZE token mint
     */
    function Vlock(program, realmName, realmVoterPublicKey, blzeTokenMint, votaBLZEMint) {
        this.program = program;
        this.REALM_NAME = realmName;
        this.REALMS_VOTER_PUBLIC_KEY = realmVoterPublicKey;
        this.BLZETokenMint = blzeTokenMint;
        this.votaBLZEMint = votaBLZEMint;
        this.GOVERNANCE_PROGRAM_ID = new web3_js_1.PublicKey("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw");
        this.VOTER_STAKE_REGISTRY_PROGRAM_ID = new web3_js_1.PublicKey("vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ");
        this.VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault")], new web3_js_1.PublicKey(idl_json_1.default.address))[0];
        this.DEPOSIT_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("deposit_vault"), this.BLZETokenMint.toBuffer()], new web3_js_1.PublicKey(idl_json_1.default.address))[0];
        this.COLLATERAL_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("collateral_vault"), this.votaBLZEMint.toBuffer()], new web3_js_1.PublicKey(idl_json_1.default.address))[0];
        this.REALM_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("governance", "utf-8"),
            Buffer.from(this.REALM_NAME, "utf-8"),
        ], this.GOVERNANCE_PROGRAM_ID)[0];
        this.GOVERNANCE_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("governance"),
            this.REALM_PDA.toBuffer(),
            this.BLZETokenMint.toBuffer(),
        ], this.GOVERNANCE_PROGRAM_ID)[0];
        this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("governance"),
            this.REALM_PDA.toBuffer(),
            this.BLZETokenMint.toBuffer(),
            this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
        ], this.GOVERNANCE_PROGRAM_ID)[0];
        this.REALM_CONFIG_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("realm-config"), this.REALM_PDA.toBuffer()], this.GOVERNANCE_PROGRAM_ID)[0];
        this.REGISTRAR_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            this.REALM_PDA.toBuffer(),
            Buffer.from("registrar"),
            this.BLZETokenMint.toBuffer(),
        ], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
        this.VOTER_PDA = web3_js_1.PublicKey.findProgramAddressSync([
            this.REGISTRAR_PDA.toBuffer(),
            Buffer.from("voter"),
            this.REALMS_VOTER_PUBLIC_KEY.toBuffer(),
        ], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
        this.VOTER_VAULT_PDA = web3_js_1.PublicKey.findProgramAddressSync([this.VOTER_PDA.toBuffer(), this.BLZETokenMint.toBuffer()], this.VOTER_STAKE_REGISTRY_PROGRAM_ID)[0];
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
                            .rpc()
                            .catch(function (err) {
                            return console.log(err);
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Initializes the vaults
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
                            depositMint: this.BLZETokenMint,
                            collateralMint: this.votaBLZEMint,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                        })
                            .rpc()
                            .catch(function (err) {
                            return console.log(err);
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    /**
     * Locks tokens in the program and return votaBLZE tokens
     * @param amount - The amount of tokens to stake (Big Number)
     * @param payer - The payer's public key
     * @returns - The transaction signature
     */
    Vlock.prototype.stakeTokens = function (amount, payer) {
        return __awaiter(this, void 0, void 0, function () {
            var STAKE_ACCOUNT_PDA, realmsTokenVault, depositToken, collateralToken, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        STAKE_ACCOUNT_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("stake_account"), payer.toBuffer()], this.program.programId)[0];
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.BLZETokenMint, this.VOTER_PDA, true, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
                    case 1:
                        realmsTokenVault = _a.sent();
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.BLZETokenMint, payer, false, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
                    case 2:
                        depositToken = _a.sent();
                        return [4 /*yield*/, (0, spl_token_1.getAssociatedTokenAddress)(this.votaBLZEMint, payer, false, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)];
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
                                payerDepositTokenAccount: depositToken,
                                payerCollateralTokenAccount: collateralToken,
                                payer: payer,
                                depositMint: this.BLZETokenMint,
                                collateralMint: this.votaBLZEMint,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                            })
                                .rpc()
                                .catch(function (err) {
                                return console.log(err);
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
                            .rpc()
                            .catch(function (err) {
                            return console.log(err);
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
                            governanceTokenMint: this.BLZETokenMint,
                            governanceVoteRecord: this.GOVERNANCE_TOKEN_OWNER_RECORD_PDA,
                            newGovernanceDelegate: new web3_js_1.PublicKey(delegate),
                            payer: this.REALMS_VOTER_PUBLIC_KEY,
                            systemProgram: web3_js_1.SystemProgram.programId,
                        })
                            .rpc()
                            .catch(function (err) {
                            return console.log(err);
                        })];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    return Vlock;
}());
exports.default = Vlock;
