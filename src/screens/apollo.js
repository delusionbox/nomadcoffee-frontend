import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); //islogged

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const logUserOut = (history) => {
    localStorage.removeItem(TOKEN);
    history?.replace();
    window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE))); //darkmode

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
}
export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
}

export const client = new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? "" : "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
})
