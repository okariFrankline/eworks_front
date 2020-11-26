/**
 * Manages the notificaiton of the current user using websocket
 */
// import the socket from the plugin
//import { Socket } from '~/plugins/socket'
// state
export const state = () => ({
    // createdOrderNotifications
   createdOrderNotifications: [],
    showCreatedChip: false,
    // assignedOrderNotifications
    assignedOrderNotifications: [],
    showAssignedChip: false,
    // acceptedOfferNotifications
    acceptedOfferNotifications: [],
    showAcceptedChip: false,
    // rejectedOfferNotifications
    rejectedOfferNotifications: [], 
    showRejectedChip: false,
    // directHireNotifications
    directHireNotifications: [], 
    showDirectHireChip: false,
    // paymentNotifications
    paymentNotifications: [], 
    showPaymentChip: false,
    // paymentNotifications
    collaborationNotifications: [ ], 
    showCollaborationChip: false
})

// mutations
export const mutations = {
    // adds a new createdOrdernotification
    ADD_CREATED_ORDER_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.createdOrderNotifications.push(payload.notification)
    },
    toggleCreatedChip: (state) => state.showCreatedChip ? state.showCreatedChip = false : state.showCreatedChip,

    // adds a new assignedOrdernotification
    ADD_ASSIGNED_ORDER_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.assignedOrderNotifications.push(payload.notification)
    },
    toggleAssignedChip: (state) => state.showAssignedChip ? state.showAssignedChip = false : state.showAssignedChip,

    // adds a new acceptedOrdernotification
    ADD_ACCEPTED_OFFER_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.acceptedOfferNotifications.push(payload.notification)
    },
    toggleAcceptedChip: (state) => state.showAcceptedChip ? state.showAcceptedChip = false : state.showAcceptedChip,

    // adds a new rejectedOrdernotification
    ADD_REJECTED_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.rejectedOfferNotifications.push(payload.notification)
    },
    toggleCreatedChip: (state) => state.showRejectedChip ? state.showRejectedChip = false : state.showRejectedChip,

    // adds a new directOrdernotification
    ADD_DIRECT_HIRE_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.directHireNotifications.push(payload.notification)
    },
    toggleDirectHireChip: (state) => state.showDirectHireChip ? state.showDirectHireChip = false : state.showDirectHireChip,

    // adds a new paymentnotification
    ADD_PAYMENT_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.paymentNotifications.push(payload.notification)
    },
    togglePaymentChip: (state) => state.showPaymentChip ? state.showPaymentChip = false : state.showPaymentChip,

    // adds a new paymentnotification
    ADD_COLLABORATION_NOTIFICATION: (state, payload) => {
        // pusht the notificaiton
        state.collaborationNotifications.push(payload.notification)
    },
    toggleCollaborationChip: (state) => state.showCollaborationChip ? state.showCollaborationChip = false : state.showCollaborationChip,
}

//actions
export const actions = {
    // get all the unread notification
    async getUnreadNotification( { commit }) {
        // get the unread notifications
        await this.$axios.get('notifications/unread')
            .then(({ data }) => {
                console.log(data)
                // commit the data
                commitNotifications(commit, data.data.notifications)
            })
    },

    // function for handling he notifications
    handleNotifications({ commit }, notifications) {
        // call the commit notifications
        commitNotifications(commit, notifications)
    }

    // function for connecting to the socket
    // connectToSocket(context, token) {
    //     // join the channel
    //     Socket.connect(token)
    // },

    // // connect to the notification channel
    // connectToNotificationNOtification({ commit }, userId) {
    //     // connect the notification channel
    //     Socket.findChannel(id)
    //         .then(({ channel }) => {
    //             channel.on('notification', ({ notificaiton}) => {
    //                 // commit the notification
    //                 commitNotifications(commit, notificaiotn)
    //             })
    //         })
    // }
}

// commit notificaitons
const commitNotifications = (commit, notifications) => {
    // check the notification asset of each of the notifications and add them to the state
    notifications.forEach(notification => {
        switch (notification.asset_type) {
            case "Posted Order":
                commit('ADD_CREATED_ORDER_NOTIFICATION', {notification: notification})
                break

            case "Assigned Order": 
            commit('ADD_ASSIGNED_ORDER_NOTIFICATION', {notification: notification})
                break

            case "Direct Hire": 
            commit('ADD_DIRECT_HIRE_NOTIFICATION', {notification: notification})
                break

            case "Order Offer":
                notification.notification_type == "Order Offer Acceptance" 
                    // add the notification to the accepted offers
                    ? commit('ADD_ACCEPTED_OFFER_NOTIFICATION', {notification: notification})
                    // add to the rejected notification type
                    : commit('ADD_REJECTED_NOTIFICATION', {notification: notification})
                break

            case "Collaboration Invite":
                commit('ADD_COLLABORATION_NOTIFICATION', {notification: notification})
                break

            default: 
            commit('ADD_PAYMENT_NOTIFICATION', {notification: notification})
                break
        }
    });
}