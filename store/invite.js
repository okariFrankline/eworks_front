/**
 * Manages new invite creation
 */
export const state = () => ({
    // invite
    invite: null
})

// mutations
export const mutations= {
    // set invite
    SET_INVITE: (state, payload) => {
        // set the invite
        state.invite = payload.invite
    },

    // show more
    TOGGLE_SHOW_MORE: (state) => {
        state.invite.show_more = !state.invite.show_more
    }
}

// getters
export const getters = {

}

// actions 
export const actions = {
    // action for creating a new invite
    async createNewInvite({ commit }, payload) {
        // post data
        await this.$axios.post(`/invites/${payload.orderId}/new`, {
            new_invite: payload.data
        })
        .then(result => {
            // set the order
            commit('SET_INVITE', {invite: result.data.data})
        })
    },

    // function for updating the invite's category and specialty
    async updateInviteCategory({ state, commit }, payload) {
        // poast the data
        await this.$axios.post(`/invites/${state.invite.id}/category`, {
            new_invite: {
                category: payload.data
            }
        })
        .then(result => {
            // set the order
            commit('SET_INVITE', {invite: result.data.data})
        })
    },

    // function fore adding the deadling
    async updateInviteDeadline({ state, commit }, payload) {
        // poast the data
        await this.$axios.post(`/invites/${state.invite.id}/deadline`, {
            new_invite: {
                deadline_collaborators: payload.data
            }
        })
        .then(result => {
            // set the order
            commit('SET_INVITE', {invite: result.data.data})
        })
    },
    
    // function for updating the payment
    async updateInvitePayment({ state, commit }, payload) {
        // poast the data
        await this.$axios.post(`/invites/${state.invite.id}/payment`, {
            new_invite: {
                payment: payload.data
            }
        })
        .then(result => {
            // set the order
            commit('SET_INVITE', {invite: result.data.data})
        })
    },

    // function for updating the description
    async updateInviteDescription({ state, commit }, payload) {
        // poast the data
        await this.$axios.post(`/invites/${state.invite.id}/description`, {
            new_invite: payload.data
        })
        .then(result => {
            // set the order
            commit('SET_INVITE', {invite: result.data.data})
        })
    },

    // function for getting an order
    async getInvite({ commit}, inviteId) {
        // get the invite
        await this.$axios.get(`/invites/${inviteId}`)
            .then(result => {
                console.log(result.data)
                // set the invite
                commit('SET_INVITE', {invite: result.data.data})
            })
    }
}