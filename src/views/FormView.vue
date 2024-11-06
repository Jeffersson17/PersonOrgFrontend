<template>
    <div>
        <h1 id="title">Formulário de Cadastro</h1>
        <RegisterForm />
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
    name: 'FormView',
    components: {
        RegisterForm
    }
}

</script>

<style>

#title {
    text-align: center;
}

</style>
