<template>

    <button class="params_button my-3">{{ intitule }}</button>

</template>

<script>
export default {
    name: 'bouton',
    props: {
        intitule : String
    }
}

</script>

<style>

    .params_button{
    border-radius: 15px;
    background-color: #fd2d01;
    padding: 8px;
    font-weight: bold;
    color: white;
}

</style>