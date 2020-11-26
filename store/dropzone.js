/**
 * Manages the dropzone options
 */
export const state = () => ({
    // token
    token: '',   
})

// export mutations
export const mutations = {
    // set the token
    SET_TOKEN: (state, token) => {
        // set th token
        state.token = token
    }
}

// getters
export const getters = {
    // options
    profileOptions: (state) => ({
        // url to where the image will be send
        url: `http://localhost:4000/api/user/profile/picture`,
        // param name
        paramName: (n) => {
            return "profile_pic"
        },
        headers: {
            "Authorization": `${state.token}`
        },
        dictDefaultMessage: "<i class='fa fa-cloud-upload'> <span class='text-caption primary--text font-weight-bold ml-3'>Choose Account Profile Picture</span>"
    })
}