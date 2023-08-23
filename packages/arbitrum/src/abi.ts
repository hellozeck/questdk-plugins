// https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/ethereum/gateway/L1GatewayRouter.sol#L229
export const OUTBOUND_TRANSFER_FRAGMENT = {
  inputs:
  [
    {internalType:"address",name:"_token",type:"address"},
    {internalType:"address",name:"_to",type:"address"},
    {internalType:"uint256",name:"_amount",type:"uint256"},
    {internalType:"uint256",name:"_maxGas",type:"uint256"},
    {internalType:"uint256",name:"_gasPriceBid",type:"uint256"},
    {internalType:"bytes",name:"_data",type:"bytes"}
  ],
  name:"outboundTransfer",
  outputs:[{internalType:"bytes",name:"",type:"bytes"}],
  stateMutability:"payable",
  type:"function"
}
