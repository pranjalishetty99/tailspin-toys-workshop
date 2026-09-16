import { beforeEach, describe, expect, it } from 'vitest';
import { createTestDatabase } from '../../db/test-helpers';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import { getAllPublishers } from './publishers';

describe('publishers data-access helper', () => {
    let db: Database;

    beforeEach(async () => {
        db = await createTestDatabase();
    });

    it('returns all publishers ordered by name', async () => {
        await db.insert(publishers).values([
            { name: 'Zebra Games', description: 'z' },
            { name: 'Alpha Arcade', description: 'a' },
            { name: 'Midnight Studio', description: 'm' },
        ]);

        const all = await getAllPublishers(db);

        expect(all).toEqual([
            { id: expect.any(Number), name: 'Alpha Arcade' },
            { id: expect.any(Number), name: 'Midnight Studio' },
            { id: expect.any(Number), name: 'Zebra Games' },
        ]);
    });

    it('returns an empty list when no publishers exist', async () => {
        await expect(getAllPublishers(db)).resolves.toEqual([]);
    });
});
