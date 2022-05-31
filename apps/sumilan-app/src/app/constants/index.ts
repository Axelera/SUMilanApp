export const isProductionEnv = () => process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'production';

export const CONTRACT_ADDRESS = isProductionEnv() ? '0x2Cd7fBE02cD4315817986210C3B058f568BdA7c8' : '0xE6f7952d3e149259209D6b9e53Bec2c05688b3A5';

export const PROGRESS_STEPS = [
    {
        id: 1,
        progress: 0,
    },
    {
        id: 2,
        progress: .25,
    },
    {
        id: 3,
        progress: .50,
    },
    {
        id: 4,
        progress: .75,
    },
    {
        id: 5,
        progress: 1,
    },
];

export const ADMIN_DASHBOARD_BASE_PATH = '/admin';