'use server';

export async function verifyCaptchaAction(
    token: string | null
): Promise<boolean> {
    return await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
        .then(async (res) => {
            const response = await res.json();
            console.log(response);

            if (res.ok) {
                if (response.success) {
                    return true;
                }
                return false;
            } else {
                return false;
            }
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
}
