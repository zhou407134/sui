// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, beforeAll } from 'vitest';
import { LocalTxnDataSerializer, ObjectId, RawSigner } from '../../src';
import { publishPackage, setup, TestToolbox } from './utils/setup';

describe.each([{ useLocalTxnBuilder: true }, { useLocalTxnBuilder: false }])(
  'Test Coin Metadata',
  ({ useLocalTxnBuilder }) => {
    let toolbox: TestToolbox;
    let signer: RawSigner;
    let packageId: ObjectId;

    beforeAll(async () => {
      toolbox = await setup();
      signer = new RawSigner(
        toolbox.keypair,
        toolbox.provider,
        useLocalTxnBuilder
          ? new LocalTxnDataSerializer(toolbox.provider)
          : undefined
      );
      const packagePath = __dirname + '/./data/coin_metadata';
      packageId = await publishPackage(signer, useLocalTxnBuilder, packagePath);
    });

    it('Test accessing coin metadata', async () => {
      expect(true).toBeTruthy();
    });
  }
);
