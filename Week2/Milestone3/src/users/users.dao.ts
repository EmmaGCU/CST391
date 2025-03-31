import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { User } from './users.model';
import { userQueries } from './users.queries';

export const readUsers = async () => {
    return execute<User[]>(userQueries.qReadUsers, []);
};

export const readUsersByUserId = async (userId: number) => {
    return execute<User[]>(userQueries.qReadUsersByUserId, [userId]);
};

export const createUser = async (user: User) => {
    return execute<OkPacket>(userQueries.qCreateUser, [user.firstName, user.lastName, user.username, user.password]);
};

export const updateUser = async (user: User) => {
    return execute<OkPacket>(userQueries.qUpdateUser, [user.firstName, user.lastName, user.username, user.password, user.userId]);
}

export const deleteUser = async (userId: number) => {
    return execute<OkPacket>(userQueries.qUpdateUser, [userId]);
}

export const readUsersByUsername = async (username: string) => {
    console.log (userQueries.qReadUsersByUsername);
    console.log (username);
    return execute<User[]>(userQueries.qReadUsersByUsername, [username]);
};