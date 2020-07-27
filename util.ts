export const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

type RemoveFromGenericList = <T>(
    stateAction: (value: React.SetStateAction<Array<T>>) => void,
    list: Array<T>
) => (key: number) => void;
export const removeFromGenericList: RemoveFromGenericList = (
    stateAction,
    list
) => (key) => stateAction(list.filter((_, index) => key !== index));

//copies array by value, overriding JS default (by reference)
export const cloneArray: <T>(originalList: T[]) => T[] = (originalList) =>
    originalList.map((item) => item);
