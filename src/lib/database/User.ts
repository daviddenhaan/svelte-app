import { prisma } from "./dbexports";

import bcrypt from 'bcrypt';

/**
 * Compare a plaintext password against a bcrypt hash.
 * @param user_password the plaintext password which is compared against the hash.
 * @param hash
 */
async function verifyPassword(user_password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(user_password, hash);
}

/**
 * Verify a login using either a username or email and a password,
 * this method returns either true or false depending on if the details check out or not.
 * @param password the plaintext password to verify the login with.
 * @param email the email from which (if passed) the user details get pulled and compared from.
 */
export async function login(password: string, email: string): Promise<boolean> {
    const user = await findUser(true, undefined, undefined, email);
    if (!user) return false;

    return await verifyPassword(password, user.userDetails.hash);
}

/**
 * Query the User table with passed parameters: uuid?, username?, email?; Returns either null or a User.
 * @param details `boolean` - either true or false, depending on if you want to query the UserDetails of the queried User.
 * @param uuid query User with this uuid value.
 * @param username query User with this username value.
 * @param email query User.UserDetails with this email value and return the owner (User) of this UserDetails object.
 */
export async function findUser(details: boolean, uuid?: string, username?: string, email?: string): Promise<any> {
    if (!(uuid || username || email)) return null;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    uuid: uuid
                },
                {
                    name: username
                },
                {
                    userDetails: {
                        email: email
                    }
                }
            ]
        },
        include: {
            userDetails: details
        }
    });

    if (!user) {
        return null;
    }

    return user;
}

/**
 * Creates a new User account in the database.
 * @param username the username to use for the account, this is case-sensitive.
 * @param email the email that is bound to this account, this email may not be used for any other account.
 * @param hashed_password the hash that will be stored in the database and is used for verification of users.
 */
export async function registerUser(username: string, email: string, hashed_password: string): Promise<any> {
    try {
        return await prisma.user.create({
            data: {
                name: username,
                userDetails: {
                    create: {
                        email: email,
                        hash: hashed_password
                    }
                }
            },
            include: {
                userDetails: true
            }
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * Returns a bcrypt salt, this should be passed to the `hash` function.
 */
export async function genSalt() {
    const saltRounds = 12;
    return bcrypt.genSaltSync(saltRounds);
}

/**
 * Returns a (bcrypt) hashed password, store this directly in database.
 * @param password the password to be hashed, this should be plaintext.
 * @param salt the salt that's used by the bcrypt hashing algorithm, this should be generated with the `genSalt` method.
 */
export async function hash(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
}