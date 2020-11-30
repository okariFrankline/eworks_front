/**
 * Manages draft invites
 */
export const state = () => ({
    // orders
    invites: [],
    // next cursor
    nextCursor: null
})

// mutations
export const mutations = {
    // mutation for setting the order
    SET_ORDERS: (state, { invites, nextCursor }) => {
        state.invites = invites
        // set the next cursor
        state.nextCursor = nextCursor
    },

    // mutations for adding invites
    ADD_INVITES: (state, { invites, nextCursor}) => {
        // set the invites
        state.invites.push(...invites)
        // set teh next cursor
        state.nextCursor = nextCursor
    },

    // mutations for removing an order
    REMOVE_ORDER: (state, inviteId) => {
        // get the order
        state.invites = state.invites.filter(invite => invite.id !== inviteId)
    },

    // mutation for reading more for the order
    TOGGLE_READ_MORE: (state, inviteId) => {
        // get the order
        let invite = state.invites.find(invite => invite.id == inviteId)
        // toggle the show more
        invite.show_more = !invite.show_more
    }
}

// actions
export const actions = {
    // action for getting the invites
    async getDraftInvites({ commit, state}) {
        // get the invites
        await this.$axios.get('/invites/created', {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : "false",
                filter: "draft"
            }
        })
        // commit the result
        .then(({ data }) => {
            state.nextCursor == 'false' 
            // set the invites
            ? commit('SET_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor})
            // add to the invites
            : commit('ADD_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor})
        })
        .catch(error => {
            // check if the error has a response
            if (error.response && error.response.status == 403) {
                // set messamge
                commit('SET_IS_CLIENT', {message: error.response.data.errors.details})
            }
        })

    }
}