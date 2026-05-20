import * as StellarSdk from '@stellar/stellar-sdk';
import { Horizon } from '@stellar/stellar-sdk';

class StellarService {
  private server: Horizon.Server;
  private networkPassphrase: string;
  
  constructor() {
    const isTestnet = process.env.NODE_ENV !== 'production';
    this.server = new Horizon.Server(
      isTestnet 
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org'
    );
    this.networkPassphrase = isTestnet
      ? StellarSdk.Networks.TESTNET
      : StellarSdk.Networks.PUBLIC;
  }
  
  async recordVote(params: {
    voterAddress: string,
    projectId: number,
    voteValue: boolean,
    amount: string,
    contractId: string
  }): Promise<string> {
    const { voterAddress, projectId, voteValue, amount, contractId } = params;
    
    // Load voter account
    const voterAccount = await this.server.loadAccount(voterAddress);
    
    // Build transaction to invoke smart contract
    const contract = new StellarSdk.Contract(contractId);
    
    const transaction = new StellarSdk.TransactionBuilder(voterAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: this.networkPassphrase
    })
      .addOperation(contract.call(
        'vote',
        StellarSdk.Address.fromString(voterAddress),
        StellarSdk.nativeToScVal(projectId, { type: 'u64' }),
        StellarSdk.nativeToScVal(voteValue, { type: 'bool' }),
        StellarSdk.nativeToScVal(amount, { type: 'i128' })
      ))
      .setTimeout(30)
      .build();
    
    // Sign and submit
    transaction.sign(StellarSdk.Keypair.fromSecret(process.env.VOTER_SECRET_KEY!));
    
    const result = await this.server.submitTransaction(transaction);
    return result.hash;
  }
  
  async getProjectFunding(contractId: string, projectId: number): Promise<{
    currentFunding: string,
    participants: number,
    approvalRate: number
  }> {
    // Query smart contract state
    const contract = new StellarSdk.Contract(contractId);
    
    // This would call a view function on the contract
    // Implementation depends on your contract's interface
    
    return {
      currentFunding: '0',
      participants: 0,
      approvalRate: 0
    };
  }
}

export default new StellarService();
