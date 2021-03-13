import { addUser, deleteUser, getUsers, updateUser } from './user.service';

(async () => {

    await updateUser(0, {
        firstName: 'Updated'
    })
        .then((user) => {
            console.log('updateUser', user);
        });

    await deleteUser(1)
        .then((user) => {
            console.log('deleteUser()', user);
        });

    await addUser({
        firstName: 'a',
        lastName: 'b',
        age: 0,
    })
        .then((user) => {
            console.log('addUser', user);
        });

    await getUsers()
        .then((users) => {
            console.log('getUsers()', users);
        });

})();
