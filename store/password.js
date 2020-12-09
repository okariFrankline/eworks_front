/**
 * Holds the unique key to be used for setting a new password
 */
export const state = () => ({
    // code
    code: null,
    // email
    email: null,
    // message
    notificationMessage: null
})

// mutations
export const mutations = {
    // set code
    SET_CODE: (state, { code }) => {
        // store the code to the local storage
        localStorage.setItem('eworks-password-reset-code', code)
    },
    // set the email
    SET_EMAIL: (state, { email }) => {
        // store the email to the local storage
        localStorage.setItem('eworks-password-reset-email', email)
    },
    // set the email
    SET_MESSAGE: (state, { message }) => state.notificationMessage = message
}

// getter functions
export const getters = {
    // code
    code: (state) => localStorage.getItem('eworks-password-reset-code'),
    // email
    email: (state) => localStorage.getItem('eworks-password-reset-email')
}