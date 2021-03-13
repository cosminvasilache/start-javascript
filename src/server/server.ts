// https://www.npmjs.com/package/json-server#database

const makeConsecutiveIdGenerator = (id: number = 0) => () => {
    return id++;
};

const getNextUserId = makeConsecutiveIdGenerator();

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

function makeData() {

    const users: User[] = [
        {
            id: getNextUserId(),
            firstName: 'John',
            lastName: 'Doe',
            age: 42,
        },
        {
            id: getNextUserId(),
            firstName: 'Jane',
            lastName: 'Doe',
            age: 43,
        },
        {
            id: getNextUserId(),
            firstName: 'Tester',
            lastName: 'Testerino',
            age: 100,
        },
    ];

    return {
        users,
    };
}

module.exports = makeData;
