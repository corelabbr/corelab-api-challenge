import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
}
