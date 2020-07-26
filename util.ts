export const getRandomInt = (max: number) =>
	Math.floor(Math.random() * Math.floor(max));

type RemoveFromGenericList = <T>(
	stateAction: (value: React.SetStateAction<Array<T>>) => void,
	list: Array<T>,
) => (key: number) => void;
export const removeFromGenericList: RemoveFromGenericList = (
	stateAction,
	list,
) => (key) => stateAction(list.filter((_, index) => key !== index));

type UpdateGenericList = <T>(
	stateAction: (value: React.SetStateAction<Array<T>>) => void,
	list: Array<T>,
) => (key: number, newValue: T) => void;
export const updateGenericList: UpdateGenericList = (stateAction, list) => (
	key,
	newValue,
) =>
	stateAction(list.map((value, index) => (index === key ? newValue : value)));

//copies array by value, overriding JS default (by reference)
export const cloneArray: <T>(originalList: T[]) => T[] = (originalList) =>
	originalList.map((item) => item);

export const generateListOfColours = (interval = 100000) => {
	const result: string[] = [
		...Array(Math.floor(Math.pow(256, 3) / interval)),
	].map((_, index) => {
		const asHex = colourRatioMap(
			index,
			Math.pow(256, 3) / interval,
			Math.pow(256, 3),
		).toString(16);
		return `#000000`.substring(0, 7 - asHex.length) + asHex;
	});
	console.log(`>>>>> result: ${result}`);
	return result.concat(['#FFFFFF']);
};
export const generateListOfColours2 = (interval = 300000) => {
	const result: string[] = [...Array(Math.floor(Math.pow(256, 3)))].reduce(
		(acc, _, index) => {
			if (index % interval === 0) {
				const asHex = index.toString(16);
				return acc.concat([`#000000`.substring(0, 7 - asHex.length) + asHex]);
			}
			return acc;
		},
		[],
	);
	return result.concat(['#FFFFFF']);
};

const colourRatioMap = (
	currentIndex: number,
	totalLength: number,
	end: number,
): number => {
	return Math.floor((currentIndex / totalLength) * end);
};
