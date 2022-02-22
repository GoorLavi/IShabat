String.random = number => {
    return [...Array(number || 10)].map(() => Math.random().toString(36)[2]).join('')
};

JSON.isEquals = (o1, o2) => {
    return JSON.stringify(o1) === JSON.stringify(o2);
};
