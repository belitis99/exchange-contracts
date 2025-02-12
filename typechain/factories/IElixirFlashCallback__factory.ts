/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IElixirFlashCallback } from "../IElixirFlashCallback";

export class IElixirFlashCallback__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IElixirFlashCallback {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IElixirFlashCallback;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee1",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "elixirFlashCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
