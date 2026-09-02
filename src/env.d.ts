interface ImportMetaEnv {
	readonly ADMIN_USER: string;
	readonly ADMIN_PASSWORD: string;
	readonly SESSION_SECRET: string;
	readonly BLOB_READ_WRITE_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
