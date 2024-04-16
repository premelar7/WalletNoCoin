<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <h1>Welcome to the homepage</h1>
                <NuxtLink to="/about">
                    <div>About</div>
                </NuxtLink>
                <h3 style="padding-top: 40px;">{{ datetime }}</h3>
                <h3 style="padding-bottom: 40px;">{{ amount }}</h3>
                <AppAlert>
                    This is an auto-imported component
                </AppAlert>
                <form @submit.prevent="uploadFile">
                    <v-file-input label="File input" variant="outlined" @change="handleFileChange"
                        required></v-file-input>
                    <v-btn variant="tonal" color="primary" type="submit">upload</v-btn>
                    <v-btn variant="text" style="margin-left: 10px;" @click="clearFile">clear all file</v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

const file = ref(null);
let datetime = ref('')
let amount = ref(0)

function handleFileChange(event) {
    file.value = event.target.files[0];
}

async function uploadFile() {
    if (!file.value) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value);

    try {
        const response = await fetch('api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
        datetime.value = result.dateTime
        amount.value = result.amount
    } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file.');
    }
}

async function clearFile() {
       try {
        const response = await fetch('api/clearfile', {
            method: 'POST'
        });
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file.');
    }
}


</script>