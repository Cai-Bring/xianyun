// state用于存放store/user用户数据
export const stare = {
    userInfo: {}
}

// 给state的数据赋值方法，mutations第一个参数必须是state
export const mutations = {
    //setUserInfo给userInfo赋值
    setUserInfo(state, data) {
        state.userInfo = data
    }
}