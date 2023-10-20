import Server from "./Server";

const useServer = (HOST: string) => {
    return new Server(HOST);
}

export default useServer;