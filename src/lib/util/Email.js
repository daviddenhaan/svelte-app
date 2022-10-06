import nodemailer from 'nodemailer';

import dotenv from "dotenv";
dotenv.config();

async function main() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testapp.svelte.email@gmail.com',
            pass: process.env.EMAIL_ACCESS_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"Svelte-App" <testapp.svelte.email@gmail.com>',
        to: "test@example.com, example@test.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    });

    console.log("Message sent: %s", info.messageId);
}

main().catch(console.error)