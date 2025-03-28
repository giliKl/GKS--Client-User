export type UserFileType ={
    id: number;
    name: string;
    ownerId: number;
    encryptedLink: string;
    filePassword: string;
    fileType: string;
    createdAt: Date;
    isActive: boolean;
};