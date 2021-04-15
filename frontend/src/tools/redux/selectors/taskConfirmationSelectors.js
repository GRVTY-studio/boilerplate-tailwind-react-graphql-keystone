import { sliceTransform } from '../../utilities/transforms';

export const selectTaskConfirmation = (state) =>
    state?.[sliceTransform.taskConfirmation];
