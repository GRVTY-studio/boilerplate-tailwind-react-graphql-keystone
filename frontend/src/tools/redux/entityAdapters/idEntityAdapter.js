import { createEntityAdapter } from '@reduxjs/toolkit';

/**
 * For entities where id should be the select id
 */
const idEntityAdapter = createEntityAdapter({
    selectId: (entity) => entity.id,
});

export default idEntityAdapter;
