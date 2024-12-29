import * as bcrypt from 'bcrypt';

export async function comparePassword(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
}

export async function encryptPassword(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, 10);
}