interface ProjectConfig {
    JWT: string;
    PORT: string;
}

export const config: ProjectConfig = {
    JWT: 'amazingSecretKeyHere',
    PORT: process.env.PORT || '1337',
};
