interface IRouter {
        link: string;
}

type TRouters = "register" | "login" | "home" | "addFriends" | "blockFriends" | "pendingFriends" | "friends" | "chat";

const config: Record<TRouters, IRouter> = {
        home: {
                link: "/",
        },
        register: {
                link: "/auth/register",
        },
        login: {
                link: "/auth/login",
        },
        addFriends: {
                link: "/friends/add",
        },
        blockFriends: {
                link: "/friends/block",
        },
        pendingFriends: {
                link: "/friends/pending",
        },
        friends: {
                link: "/friends",
        },
        chat: {
                link: "/chat",
        },
};

export default config;
