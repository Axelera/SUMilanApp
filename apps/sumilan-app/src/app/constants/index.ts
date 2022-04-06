const isProduction = process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'production';

export const CONTRACT_ADDRESS = isProduction ? '0x2Cd7fBE02cD4315817986210C3B058f568BdA7c8' : '0xE6f7952d3e149259209D6b9e53Bec2c05688b3A5';