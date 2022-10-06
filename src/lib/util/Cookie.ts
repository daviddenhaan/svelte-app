export function setCookie(cookieName: string, cookieValue: string, expiryDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}

export function getCookie(cookieName: string): null | string {
    const name = `${cookieName}=`;
    const cookieData = document.cookie.split(';');
    for (let i = 0; i < cookieData.length; i++) {
        let cookie = cookieData[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}

export function getToken(): null | string {
    const token = getCookie("token");
    if (token && token != "") {
        return token;
    } else return null;
}