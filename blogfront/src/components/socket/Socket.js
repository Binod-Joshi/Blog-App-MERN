import io from "socket.io-client";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}`;

export const socket = io(ENDPOINT);
