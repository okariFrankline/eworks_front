<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- posted invites -->
        <MyPostedInvites
            :invites="invites"
            :isClientMessage="isClientMessage"
        />
        <!-- End of posted invites -->

        <IsClient
            :showIsClient="showClientDialog"
            :message="'No created collaboration invites to see.'"
            :icon="'mdi-database-off'"
            @hide-dialog="() => $store.commit('my_posted_invites/HIDE_DIALOG')"
        />
    </v-col>
</template>

<script>
// import my posted invites
import MyPostedInvites from "~/components/collaboration/MyPostedInvites"
// import is client
import IsClient from "~/components/dialogs/IsClient"
// import map state
import { mapState } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        MyPostedInvites,
        IsClient
    },
    // fetch function
    async fetch({ store }) {
        // dispatch the action
        await store.dispatch('my_posted_invites/getMyInvites', {filter: "unassigned"})
            .catch(err => {
                console.log(err)
            })
    },
    // computed
    computed: {
        ...mapState('my_posted_invites', [
            'invites',
            'showClientDialog',
            'isClientMessage'
        ])
    },
    // before rout leave
    beforeRouteLeave (to, from ,next) {
        // set the showing to unassigned
        this.$store.commit('my_posted_invites/SET_SHOWING', "unassigned")
        // call next
        next()
    }
}
</script>