/**
 * 用户信息类型
 */
export type UserType = {
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string[];
    createTime: Date;
}