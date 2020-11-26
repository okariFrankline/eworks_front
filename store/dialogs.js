export const state = () => ({
    // payment dialog
    paymentDialog: false,
    // description dialog
    descriptionDialog: false,
    // attachemtn dialog
    attachmentDialog: false,
    // withdrawaldialog
    withdrawalDialog: false,
    // mpesa dialog
    mpesaDialog: false,
    // bankdialog
    bankDialog: false,
    // notification dialog
    notificationDialog: false,
    // type dialog
    typeDialog: false,
    // jobDialog
    jobDialog: false,
    // duration dialogs
    durationDialog: false,
    // dialog for upgrade
    showUpgrade: false
});

// mutations
export const mutations = {
    // function for changing the value of the payment dialog
    togglePaymentDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.paymentDialog = !state.paymentDialog;
    },

    // function for changing the value of the payment dialog
    toggleDescriptionDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.descriptionDialog = !state.descriptionDialog;
    },

    // function for changing the value of the payment dialog
    toggleAttachmentDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.attachmentDialog = !state.attachmentDialog;
    },

    // function for changing the value of the payment dialog
    toggleWithdrawalDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.withdrawalDialog = !state.withdrawalDialog;
    },

    // function for changing the value of the payment dialog
    toggleMpesaDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.mpesaDialog = !state.mpesaDialog;
    },

    // function for changing the value of the payment dialog
    toggleBankDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.bankDialog = !state.bankDialog;
    },

    // function for changing the value of the payment dialog
    toggleNotificationDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.notificationDialog = !state.notificationDialog;
    },

    // function for changing the value of the payment dialog
    toggleTypeDialog: (state) => {
        // set the state payment dialog to the opposit of its current value
        state.typeDialog = !state.typeDialog;
    },

    // toggle job dialog
    toggleJobDialog: (state) => {
        //set the type dialog to not its current value
        state.jobDialog = !state.jobDialog
    },

    // toggle duration dialog
    toggleDurationDialog: (state) => {
        // set the duration dialog
        state.durationDialog = !state.durationDialog
    },

    // function for hiding the upgrade
    TOGGLE_SHOW_UPGRADE: (state) => {
        // CALLED
        console.log('called')
        state.showUpgrade = !state.showUpgrade
        console.log(state.showUpgrade)
    },

    // function for showing the show upgrade
    SHOW_UPGRADE: (state) => state.showUpgrade = true,
    // hide show upgrade
    HIDE_UPGRADE: (state) => state.showUpgrade = false
}