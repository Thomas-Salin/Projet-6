<template>

    <button class="params_button my-3 effet">{{ intitule }}</button>

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

.effet{
    transition: 300ms ease-in-out;
}
.effet:hover{
    transform: scale(1.1);
    transition: 300ms ease-in-out;
}

</style>