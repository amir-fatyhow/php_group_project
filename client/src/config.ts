// UdSU
const DOMAIN = 'https://api.gym-game.ru/';
//const DOMAIN = 'http://server/';
const PORT = null;

// dev
//const DOMAIN = 'http://pi21';
//const PORT = 433;

export const HOST = PORT ? `${DOMAIN}:${PORT}` : DOMAIN;