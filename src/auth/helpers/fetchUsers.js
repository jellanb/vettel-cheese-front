export const UseFetchLogin = async (email, password) => {
    const url = `${process.env.REACT_APP_API_URL}/login?email=${email}&password=${password}`;
    return (await fetch(url, { mode: 'cors', method: 'GET' })).json();
};

export const UseFetchRegisterUser = async (username, password, email, rol) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/register-user?username=${username}&password=${password}&email=${email}&rol=${rol}`;
        return (await fetch(url, { mode: 'cors', method: 'POST' })).json();
    } catch (failure) {
        if (failure.code === 500) return failure
    }

};