import { IUser } from '@/types/user';
import axios, { AxiosError } from 'axios';

export class UserModule {
    private _user: IUser | undefined = undefined;
    constructor(private readonly token: string | null) {}

    async fetchUser() {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/user/check`,
                {
                    headers: {
                        Cookie: `token=${this.token}`,
                    },
                }
            );
            this._user = res.data;
        } catch (e: AxiosError | any) {
            console.log(e?.message);
            throw e;
        }
    }

    get user() {
        return this._user;
    }

    verified() {
        if (this._user) return this._user.emailVerified;
    }

    authenticated() {
        return !!this.token;
    }
}
