/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BitMathEchidnaTest } from "../BitMathEchidnaTest";

export class BitMathEchidnaTest__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<BitMathEchidnaTest> {
    return super.deploy(overrides || {}) as Promise<BitMathEchidnaTest>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BitMathEchidnaTest {
    return super.attach(address) as BitMathEchidnaTest;
  }
  connect(signer: Signer): BitMathEchidnaTest__factory {
    return super.connect(signer) as BitMathEchidnaTest__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BitMathEchidnaTest {
    return new Contract(address, _abi, signerOrProvider) as BitMathEchidnaTest;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "input",
        type: "uint256",
      },
    ],
    name: "leastSignificantBitInvariant",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "input",
        type: "uint256",
      },
    ],
    name: "mostSignificantBitInvariant",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506102bf806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632d711e0c1461003b578063f94ac90e1461005a575b600080fd5b6100586004803603602081101561005157600080fd5b5035610077565b005b6100586004803603602081101561007057600080fd5b50356100ab565b6000610082826100e8565b905060ff811660020a821661009357fe5b60001960ff821660020a018216156100a757fe5b5050565b60006100b6826101dc565b90508060ff1660020a8210156100c857fe5b8060ff1660ff14806100e257508060010160ff1660020a82105b6100a757fe5b60008082116100f657600080fd5b5060ff6fffffffffffffffffffffffffffffffff82161561011a57607f1901610122565b608082901c91505b67ffffffffffffffff82161561013b57603f1901610143565b604082901c91505b63ffffffff82161561015857601f1901610160565b602082901c91505b61ffff82161561017357600f190161017b565b601082901c91505b60ff82161561018d5760071901610195565b600882901c91505b600f8216156101a757600319016101af565b600482901c91505b60038216156101c157600119016101c9565b600282901c91505b60018216156101d757600019015b919050565b60008082116101ea57600080fd5b700100000000000000000000000000000000821061020a57608091821c91015b68010000000000000000821061022257604091821c91015b640100000000821061023657602091821c91015b62010000821061024857601091821c91015b610100821061025957600891821c91015b6010821061026957600491821c91015b6004821061027957600291821c91015b600282106101d75760010191905056fea2646970667358221220031fd4f634f7a4f8b4e7be10a127024cd7b7c22a5a8e0d126d4635c024baf83f64736f6c63430007060033";
