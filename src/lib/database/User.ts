import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function test() {
    const user = await prisma.user.create({
        data: {
            name: 'David',
            email: 'daviddenhaan@gmail.com'
        }
    });

    return user;
}

export default async function main() {
    const user = await test()
        .catch(e => {
            console.log(e.message);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return user;
}