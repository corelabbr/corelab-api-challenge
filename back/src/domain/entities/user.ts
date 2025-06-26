
export class User {
    public id?: number;
    public createdAt?: Date;
    public resetToken?: string | null;
    public tokenExpires?: Date | null;

    constructor(
        public nome: string,
        public email: string,
        public passwordHash: string,
        id?: number,
        createdAt?: Date,
        resetToken?: string | null,
        tokenExpires?: Date | null
    ) {
        if (id) this.id = id;
        if (createdAt) this.createdAt = createdAt;
        if (resetToken) this.resetToken = resetToken;
        if (tokenExpires) this.tokenExpires = tokenExpires;
    }
}
