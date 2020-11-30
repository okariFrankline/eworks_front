<template>
    <v-dialog v-model="attachmentDialog" max-width="650" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    New Order: <span class="ml-1">Add Order Attachments</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="attachmentDialog">
                    <span class="text-caption font-weight-bold ml-4 teal--text">
                        Add attachemts to compliment your job description 
                    </span>
                    <span class="font-weight-bold pink--text text-caption ml-2">(skip if none is required.)</span>

                    <dropzone 
                        id="foo" 
                        ref="dropzone" 
                        :options="dropzoneOptions" 
                        :destroyDropzone="true" 
                        @vdropzone-error="uploadError"
                        style="margin-top: 2em;"
                        @vdropzone-complete-multiple="uploadSuccess"
                        @vdropzone-sending="uploadingFiles"
                    ></dropzone>
                </v-form>
            </v-card-text>

            <v-card-actions class="mt-n4">
                <!-- Cance button -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize ml-6" 
                    color="error"
                    text
                    small 
                    @click="cancelAttachmentDialog"
                >
                    <span class="text-caption text-capitalize font-weight-bold">cancel</span>
                </v-btn>
                <!-- End of cancel button -->
                <v-spacer></v-spacer>
                <!-- Skip button -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-6" 
                    color="teal" 
                    small
                    text
                    :loading="loading"
                    @click="() => $emit('review-order', order.id)"
                >
                    <span class="text-caption text-capitalize font-weight-bold">skip upload</span>
                    <template v-slot:loader>
                        <span class="text-caption pl-3 pr-4 font-weight-bold teal--text">Uploading..</span>
                        <span class="custom-loader">
                            <v-icon small light color="teal">mdi-cached</v-icon>
                        </span>
                    </template>
                </v-btn>
                <!-- End of Skip button -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import dropzone for the attachment uploads
import Dropzone from 'nuxt-dropzone'
// import the dropzone css
import 'nuxt-dropzone/dropzone.css'
// import mapState
import { mapState, mapGetters } from "vuex"
// component definition
export default {
    // name
    name: "AttachmentDialog",
    // components
    components: {
        Dropzone
    },
    // computed
    computed: {
      // get the dialog state
      ...mapState('dialogs', [
          'attachmentDialog'
      ]),
      // map created order
      ...mapState('created_order', [
        'order'
      ]),
      // get the dropzone
      ...mapGetters('created_order', [
          'dropzoneOptions'
      ])
    },
    // data
    data: () => ({
        // loading
        loading: false,
        // loader
        loader: null
    }),
    // methods
    methods: {
        // cancel attachement dialog
        cancelAttachmentDialog() {
            // reset the dropzone
            this.$refs.dropzone.removeAllFiles()
            // set loading to false
            this.loading = false
            // set loader to null
            this.loader = null
            // hide the dialog
            this.$store.commit('dialogs/toggleAttachmentDialog')
        },
        // function for uploading files
        uploadingFiles() {
            // set the loading to true
            this.loading = true
            // set the loader to loading
            this.loader = this.loading
        },
        // function for upload success
        uploadSuccess(file, response) {
            // reset the dropzone
            this.$refs.dropzone.removeAllFiles()
            // hide the dialog
            this.$store.commit('dialogs/toggleAttachmentDialog')
            // set the loading to false
            this.loading = false
            // set the loader to null
            this.loader = null
            // call the review order
            this.$emit('review-order', this.order.id)
        },
        // function for handling an upload error
        uploadError(file, message, xhr) {
            // create a message
            let msg = 'Failed. Attachments could not be uploaded. Please try again.'
            // reset the dropzone
            this.$refs.dropzone.removeAllFiles()
            // set the loading to false
            this.loading = false
            // set the loader to null
            this.loader = false
            // emit an error
            this.$emit('error', msg)
        }
    }
}
</script>