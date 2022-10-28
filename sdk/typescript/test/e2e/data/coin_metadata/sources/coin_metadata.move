// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module coin_metadata::test {
    use sui::coin::{Self, SuiCoinRegistry};
    use sui::transfer;
    use sui::tx_context::TxContext;

    /// Name of the coin. By convention, this type has the same name as its parent module
    /// and has no fields. The full type of the coin defined by this module will be `COIN<TEST>`.
    struct TEST has drop {}

    // !!! Chris: cannot pass in SuiCoinRegistry since module
    // initializer can not have extra parameters

    /// Register the managed currency to acquire its `TreasuryCap`. Because
    /// this is a module initializer, it ensures the currency only gets
    /// registered once.
    fun init(witness: TEST, ctx: &mut TxContext) {
        // Get a treasury cap for the coin and give it to the transaction sender
        let treasury_cap = coin::create_currency<TEST>(witness, 2, ctx);
        transfer::share_object(treasury_cap)
    }
}
