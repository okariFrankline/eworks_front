export const state = () => ({
   // createdOrderNotifications
   createdOrderNotifications: [
       {
           notification_type: "Offer Submission",
           message: "Frankline Okari placed an offer on your order."
       },
       {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order."
       },
   ],
   showCreatedChip: false,
   // assignedOrderNotifications
   assignedOrderNotifications: [
        {
            notification_type: "Order Assignment",
            message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Order Assignment",
        message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
            notification_type: "Order Assignment",
            message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Order Assignment",
        message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
            notification_type: "Order Assignment",
            message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Order Assignment",
        message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        }
   ],
   showAssignedChip: false,
   // acceptedOfferNotifications
   acceptedOfferNotifications: [
        {
            notification_type: "Offer Submission",
            message: "Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order."
        }
   ],
   showAcceptedChip: false,
   // rejectedOfferNotifications
   rejectedOfferNotifications: [
        {
            notification_type: "Offer Submission",
            message: "Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order."
        }
   ], 
   showRejectedChip: false,
   // directHireNotifications
   directHireNotifications: [
        {
            notification_type: "Offer Submission",
            message: "Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order."
        }
   ], 
   showDirectHireChip: false,
   // paymentNotifications
   paymentNotifications: [
        {
            notification_type: "Offer Submission",
            message: "Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order."
        }
   ], 
   showPaymentChip: false,
   // paymentNotifications
   collaborationNotifications: [
        {
            notification_type: "Offer Submission",
            message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        },
        {
        notification_type: "Offer Submission",
        message: "Frankline Okari placed an offer on your order. Frankline Okari placed an offer on your order."
        }  
    ], 
    showCollaborationChip: false
})

// mutations
export const mutations = {
    // adds a new createdOrdernotification
    addCreatedOrderNotification: (state, payload) => {
        // pusht the notificaiton
        state.createdOrderNotifications.push(payload.notification)
    },
    toggleCreatedChip: (state) => state.showCreatedChip ? state.showCreatedChip = false : state.showCreatedChip,

    // adds a new assignedOrdernotification
    addAssignedOrderNotification: (state, payload) => {
        // pusht the notificaiton
        state.assignedOrderNotifications.push(payload.notification)
    },
    toggleAssignedChip: (state) => state.showAssignedChip ? state.showAssignedChip = false : state.showAssignedChip,

    // adds a new acceptedOrdernotification
    addAcceptedOfferNotification: (state, payload) => {
        // pusht the notificaiton
        state.acceptedOfferNotifications.push(payload.notification)
    },
    toggleAcceptedChip: (state) => state.showAcceptedChip ? state.showAcceptedChip = false : state.showAcceptedChip,

    // adds a new rejectedOrdernotification
    addRejectedOfferNotification: (state, payload) => {
        // pusht the notificaiton
        state.rejectedOfferNotifications.push(payload.notification)
    },
    toggleCreatedChip: (state) => state.showRejectedChip ? state.showRejectedChip = false : state.showRejectedChip,

    // adds a new directOrdernotification
    addDirectHireNotification: (state, payload) => {
        // pusht the notificaiton
        state.directHireNotifications.push(payload.notification)
    },
    toggleDirectHireChip: (state) => state.showDirectHireChip ? state.showDirectHireChip = false : state.showDirectHireChip,

    // adds a new paymentnotification
    addPaymentNotification: (state, payload) => {
        // pusht the notificaiton
        state.paymentNotifications.push(payload.notification)
    },
    togglePaymentChip: (state) => state.showPaymentChip ? state.showPaymentChip = false : state.showPaymentChip,

    // adds a new paymentnotification
    addCollaborationNotification: (state, payload) => {
        // pusht the notificaiton
        state.collaborationNotifications.push(payload.notification)
    },
    toggleCollaborationChip: (state) => state.showCollaborationChip ? state.showCollaborationChip = false : state.showCollaborationChip,
}

// getters
export const getters = {
    // get the createdOrdersNotifications
    createdOrderNotifications: (state) => state.createdOrderNotifications,

    // function for returning the assignedOrder notifications
    assignedOrderNotifications: (state) => state.assignedOrderNotifications,

    // function for returning the assignedOrder notifications
    acceptedOfferNotifications: (state) => state.acceptedOfferNotifications,

    // function for returning the assignedOrder notifications
    rejectedOfferNotifications: (state) => state.rejectedOfferNotifications,

    // function for returning the assignedOrder notifications
    directHireNotifications: (state) => state.directHireNotifications,

    // function for returning the assignedOrder notifications
    paymentNotifications: (state) => state.paymentNotifications,

    // function for returning the assignedOrder notifications
    collaborationNotifications: (state) => state.collaborationNotifications,

}