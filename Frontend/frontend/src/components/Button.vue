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
    padding: 10px;
    font-weight: bolder;
    color: white;
}

</style>