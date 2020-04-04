export const formatInput = (input: Object): Object => {
    const arr = Object.entries(input);
    const formattedArray = arr.map(([ key, value ]): [string, any] => [ key, value || null ]);

    return Object.fromEntries(formattedArray);
};
