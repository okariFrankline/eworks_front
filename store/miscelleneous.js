export const state = () => ({
    // activation message
    activationMessage: ''
})

export const mutations = {
    // set activation messgae
    setActivationMessage: (state, payload) => state.activationMessage = payload.message
}

// getters
export const getters = {
    // activationmessage
    activationMessage: (state) => state.activationMessage
}