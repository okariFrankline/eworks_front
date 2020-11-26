/**
 * Manages unassigned collaborations
 */
export const state = () => ({
    // collaborations
    invites: [],
    // next cursor
    nextCursor: null,
    // stores the invite ids for which the current user has already submitted offers for
    inviteIds: []
})

// mutations
export const mutations = {
    // set the invites
    SET_INVITES: (state, payload) => {
        // set the next cursor
        state.nextCursor = payload.nextCursor
        // set the invites
        state.invites = payload.invites
        // set the invites ids
        state.inviteIds = payload.inviteIds
    },

    // function for adding to the invites
    ADD_INVITES: (state, payload) => {
        // set the next cursor
        state.nextCursor = payload.nextCursor
         // set the invites ids
         state.inviteIds = payload.inviteIds
        // add the data
        state.invites.push(...payload.invites)
    },

    // toggle shoe more
    TOGGLE_SHOW_MORE: (state, inviteId) => {
        // get the invite
        let invite = state.invites.find(invite => invite.id == inviteId)
        // toggle the show more
        invite.show_more = !invite.show_more
    },

    // adds an accepted invite id to the inviteIds
    ADD_INVITE_ID: (state, inviteId) => {
        // push the invite id
        state.inviteIds.push(inviteId)
    }
}

// getters
export const getters = {
    invites: (state) => state.invites
}

// actions
export const actions = {
    // function for getting the invites
    async getInvites ({ commit, state}) {
        // get the data
        await this.$axios.get('/invites/unassigned', {
            params: {
                next_cursor: state.nextCursor ? state.nextCursor : "false"
            }
        })
        .then(( { data }) => {
            // check if the next cursor is given
            state.nextCursor
                // set the invites
                ? commit('ADD_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor, inviteIds: data.data.invite_ids})
                // set the invites
                : commit('SET_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor, inviteIds: data.data.invite_ids})
        })
    }
}