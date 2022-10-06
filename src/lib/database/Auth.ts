import dotenv from 'dotenv';
dotenv.config();

import { prisma } from "./dbexports";
import jwt, {NotBeforeError, TokenExpiredError} from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export async function jwtVerify(token: string) {
    const userDetails = await prisma.userDetails.findUnique({
        where: {
            token: token
        }
    });

    if (!userDetails || !userDetails.token) return null;

    return jwt.verify(userDetails.token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
       if (err) {
           if (err.name === TokenExpiredError.name) {
               return null;
           }

           else if (err.name === NotBeforeError.name) {
               return "token not activated yet";
           }

           else {
               return null;
           }
       }

       return decoded;
    });
}

export async function updateToken(uuid: string) {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data: uuid
    }, process.env.ACCESS_TOKEN_SECRET as any);

    await prisma.user.update({
        where: {
            uuid: uuid
        },
        data: {
            userDetails: {
                update: {
                    token: token
                }
            }
        }
    });

    return token;
}

export async function login(email: string, password: string): Promise<null | string> {
    const userDetails = await prisma.userDetails.findUnique({
        where: {
            email: email
        },
        include: {
            user: true
        }
    });
    if (!userDetails) return null;
    const user = userDetails.user;

    const res = await bcrypt.compare(password, userDetails.hash);
    if (!res) return null;

    if (!userDetails.token || !await jwtVerify(userDetails.token)) {
        if (!user) return null;
        return await updateToken(user.uuid);
    }

    return userDetails.token;
}