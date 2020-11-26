/**
 * Manages the user profile information of the current user
 */
export const state = () => ({
    // user
    user: {},
    // previous hires
    previousHires: []
})

// mutation
export const mutations = {
    // mutation for setting the user
    SET_USER: (state, payload) => {
        // set the user
        state.user = payload.user
        // set the previous hires
        state.previousHires = payload.previousHires
    },

    // update location
    UPDATE_LOCATION: (state, payload) => {
        // set the loaction
        state.user.country = payload.country
        // update the city
        state.user.city = payload.city
        // update the location
        state.user.location = `${payload.city}, ${payload.country}`
    },

    // muataion for updating the emails
    UPDATE_EMAIL: (state, payload) => {
        // set the emails
        state.user.auth_email = payload.email
    },

    // muataion for updating the emails
    UPDATE_PHONE: (state, payload) => {
        // set the emails
        state.user.phone = payload.phone
    },

    // update picture
    UPDATE_PICTURE: (state, payload) => {
        // set the picture
        state.user.profile_pic = payload.image
    },

    // show more
    SHOW_ORDER_MORE: (state, payload) => {
        // find the order with the given id
        let order = state.previousHires.find(order => order.id == payload.orderId)
        // toggle the show more
        order.show_more = !order.show_more
    },

    // show user more
    SHOW_USER_MORE: (state) => state.user.work_profile.show_more = !state.user.work_profile.show_more
}

// action for getting the current profile of the user
export const actions = {
    // function foe gettignthe current user's profile
    async getMyProfile ({ commit }) {
        // await the data
        await this.$axios.get('/user/current/profile')
            .then(({ data }) => {
                console.log(data)
                this.$auth.user.user_type == "Client" 
                // commit the data
                ? commit('SET_USER', {user: data.data.user, previousHires: []})
                // set for the independent contractor
                : commit('SET_USER', {user: data.data.user, previousHires: data.data.previous_hires})
            })
    }
}