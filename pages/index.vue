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
                <form @submit.prevent="uploadFile">
                    <v-file-input label="File input" variant="outlined" @change="handleFileChange" required></v-file-input>
                    <v-btn variant="tonal" type="submit">upload</v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

const file = ref(null);

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
        alert(result.message);
    } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file.');
    }
}

</script>