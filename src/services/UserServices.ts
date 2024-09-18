import myAxios from "../plugins/myAxios";
import {getCurrentUserStates, setCurrentUserStates} from "../states/user";

export const getCurrentUser = async () => {
    //用户缓存状态，页面刷新才能显示最新更新数据所以小系统就不用缓存了
    const currentUser = getCurrentUserStates();
    if (currentUser) {
        console.log("缓存中的currentUser", currentUser);
        return currentUser;
    }
    // 如果没有当前用户，则从服务器获取
    const res = await myAxios.get("/user/current");
    if (res.code === 0) {
        setCurrentUserStates(res.data);
        return res.data;
    }
    return null;
};
