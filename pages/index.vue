<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <h1>Welcome to the homepage</h1>
                <NuxtLink to="/about">
                    <div>About</div>
                </NuxtLink>
                <AppAlert>
                    This is an auto-imported component
                </AppAlert>
                <v-text-field v-model="firstname" variant="outlined" label="First name"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            value => {
                if (value) return true

                return 'Name is required.'
            },
            value => {
                if (value?.length <= 10) return true

                return 'Name must be less than 10 characters.'
            },
        ],
        email: '',
        emailRules: [
            value => {
                if (value) return true

                return 'E-mail is requred.'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true

                return 'E-mail must be valid.'
            },
        ],
    }),
}
</script>