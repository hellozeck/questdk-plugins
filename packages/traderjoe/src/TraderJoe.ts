import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, zeroAddress as NATIVE_TOKEN } from 'viem'
import { LBRouterV21ABI, LB_ROUTER_V21_ADDRESS } from '@traderjoe-xyz/sdk-v2'
import { DEFAULT_SWAP_TOKEN_LIST, Tokens } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { buildPathQuery, Chains } from './utils'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  const nativeIn = tokenIn === NATIVE_TOKEN
  const nativeOut = tokenOut === NATIVE_TOKEN
  const to = contractAddress ?? LB_ROUTER_V21_ADDRESS[chainId as Chains]

  return compressJson({
    chainId,
    to,
    value: nativeIn ? amountIn : undefined,
    input: {
      $abi: LBRouterV21ABI,
      $and: [
        {
          to: recipient,
          path: {
            tokenPath: buildPathQuery(
              nativeIn ? Tokens[chainId]?.WETH : tokenIn,
              nativeOut ? Tokens[chainId]?.WETH : tokenOut,
            ),
          },
        },
        {
          $or: [
            {
              // exactNativeforTokens, exactTokensForTokens
              amountIn: nativeIn ? undefined : amountIn,
              amountOutMin: amountOut,
            },
            { amountOut: amountOut }, // nativeForExactTokens
            { amountInMax: amountIn, amountOut: amountOut }, // tokensForExactTokens
            { amountIn: amountIn, amountOutMinNATIVE: amountOut }, // exactTokensForNative
            { amountInMax: amountIn, amountNATIVEOut: amountOut }, // tokensForExactNative
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return (DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]) ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
