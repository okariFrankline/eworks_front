/**
 * Manages the invites posted by the current user
 */
export const state = () => ({
    // invites
    invites: [],
    // pending next cursor
    assignedNextCursor: '',
    // progress cursor
    inProgressNextCursor: '',
    // is client message
    isClientMessage: '',
    // is client message
    showClientDialog: false,
    // shoing
    showing: 'unassigned'
})

// mutations
export const mutations = {
    // mutations for setting the invites
    SET_INVITES: (state, payload) => {
        // set the invites
        state.invites = payload.invites
        // set teh next cursor
        setNextCursor(state, payload.filter, payload.nextCursor)
    },

    // mutation for setting client
    SET_IS_CLIENT: (state, payload) => {
        // set the is client message
        state.isClientMessage = payload.message
        // set the show is client
        state.showClientDialog = true
    },

    // hide dialog
    HIDE_DIALOG: (state) => {
        // set the state to false
        state.showClientDialog = false
    },

    // mutations for adding invites
    ADD_INVITES: (state, payload) => {
        // set the invites
        state.invites.push(...payload.invites)
        // set teh next cursor
        setNextCursor(state, payload.filter, payload.nextCursor)
    },

    // remove invite
    REMOVE_INVITE: (state, payload) => {
        // find the invite
        state.invites = state.invites.filter(invite => invite.id != payload.inviteId)
    },

    // function for show more
    TOGGLE_SHOW_MORE: (state, inviteId) => {
        // find the invite
        let invite = state.invites.find(invite => invite.id == inviteId)
        // toggle the show more
        invite.show_more = !invite.show_more
    },

    // set showing
    SET_SHOWING: (state, value) => state.showing = value
}

// actions
export const actions = {
    // action for getting the invites
    async getMyInvites({ commit, state}, payload) {
        // get the cursor
        let cursor = getNextCursor(state, payload.filter)
        // get the invites
        await this.$axios.get('/invites/created', {
            params: {
                next_cursor: cursor,
                filter: payload.filter
            }
        })
        // commit the result
        .then(({ data }) => {
            cursor == 'false' 
            // set the invites
            ? commit('SET_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor, filter: payload.filter})
            // add to the invites
            : commit('ADD_INVITES', {invites: data.data.invites, nextCursor: data.data.next_cursor, filter: payload.filter})
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

// get next cursor
const getNextCursor = (state, filter) => {
    // get the cursor
    let cursor
    // check the filter
    if (filter == "unassigned") {
        cursor = state.assignedNextCursor
    } else if (filter == "in_progress") {
        cursor = state.inProgressNextCursor
    } 
    // check if the cursor is avaiilable and return the value
    return cursor ? cursor : "false"
}

// function for setting the next cursor
const setNextCursor = (state, filter, cursor) => {
    // check the filter
    if (filter == "unassigned") {
        return state.assignedNextCursor = cursor
    } else if (filter == "in_progress") {
        return state.inProgressNextCursor = cursor
    } 
}