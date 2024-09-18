/**
 * 用户信息类型
 */
export type UserType = {
    userName: string;
    userAccount: string;
    userPassword: string;
    userAvatar: string;
    userprofile: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string[];
    createTime: Date;
    updateTime: Date;
}