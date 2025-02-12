/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IElixirMintCallbackInterface extends ethers.utils.Interface {
  functions: {
    "elixirMintCallback(uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "elixirMintCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "elixirMintCallback",
    data: BytesLike
  ): Result;

  events: {};
}

export class IElixirMintCallback extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IElixirMintCallbackInterface;

  functions: {
    elixirMintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "elixirMintCallback(uint256,uint256,bytes)"(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  elixirMintCallback(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "elixirMintCallback(uint256,uint256,bytes)"(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    elixirMintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "elixirMintCallback(uint256,uint256,bytes)"(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    elixirMintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "elixirMintCallback(uint256,uint256,bytes)"(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    elixirMintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "elixirMintCallback(uint256,uint256,bytes)"(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
