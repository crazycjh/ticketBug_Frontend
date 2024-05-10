<!-- <script setup>
import { decodeCredential } from 'vue3-google-login'
import axios from 'axios'

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
console.log("Handle the response", response)
const userData = decodeCredential(response.credential)
console.log(userData);
}
</script>

<template>
    <GoogleLogin :callback="callback"/>
</template> -->