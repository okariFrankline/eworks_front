<template>
    <v-row class="mt-n2">
        <v-col md=12>
            <v-card-text class="mt-3">
                <v-row class="mt-n3" justify="center">
                    <v-icon :color="color" x-large>
                        {{ icon }}
                    </v-icon>
                </v-row>

                <v-row justify="center" class="mt-3">
                    <p class="text-body-2 font-weight-bold px-4" :class="`${color}--text`">
                        {{ message }}
                    </p>
                </v-row>
                
            </v-card-text>
            <!-- End of offer owner about -->
        </v-col>
    </v-row>
</template>

<script>
export default {
    // name
    name: 'NotFoundCard',
    // props
    props: {
        message: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: false,
            default: 'error'
        },
        icon: {
            type: String,
            required: false,
            default: 'mdi-eye-off'
        }
    }
}
</script>