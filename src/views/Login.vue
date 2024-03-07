<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { useToggle } from '@vueuse/core';
import type { Router } from 'vue-router';

import { alert } from '@/utils/alert';
import { userStore } from '@/stores';

const router: Router = useRouter();

const [ showPassword, togglePassword ] = useToggle();
const loginSchema = object({
  email: string().required().email(),
  password: string().required().min(8)
});
const { errors, defineField, meta, handleSubmit } = useForm({ validationSchema: loginSchema });
const [ email, emailAttrs ] = defineField('email', {
  validateOnModelUpdate: false
});
const [ password, passwordAttrs ] = defineField('password', {
  validateOnModelUpdate: false
});
const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');

/**
 * Authenticate the given user.
 *
 * @return {Promise<void>}
 */
const authenticate = handleSubmit(async values => {
  const submitButton: HTMLButtonElement = document.getElementById('login-btn') as HTMLButtonElement;

  try {
    submitButton.disabled = true;
    
    await userStore.authenticateUser({ 
      email: values.email, 
      password: values.password 
    });

    router.push({ name: 'dashboard' });
  } catch (error: any) {
    const message = error.error 
      ? error.error
      : 'Whoops, something went wrong. Please try again.';

    alert.toast('error', message);
  } finally {
    submitButton.disabled = false;
  }
})
</script>

<template lang="pug">
.container
  .row
    #login.col-md-4.offset-md-4.pt-5
      h1.text-center.py-5 Login

      .card 
        .card-body
          form(@submit="authenticate")
            .mb-4
              label.form-label(for="email") Email address
              input#email.form-control(:class="{'input-error': errors.email && meta.touched }" name="email" type="email" v-model="email" :bind="emailAttrs" placeholder="john@doe.com" autocomplete="username")
              span.validation-error(v-if="errors.email && meta.touched") {{ errors.email }}

            .mb-5
              label.form-label(for="password") Password

              .input-group
                input#password.form-control(:class="{'input-error': errors.password && meta.touched }" name="password" :type="passwordInputType" v-model="password" :bind="passwordAttrs" autocomplete="current-password")
                span.input-group-text.pointer(@click='togglePassword()')
                  i.fa.fa-eye

              span.validation-error(v-if="errors.password && meta.touched") {{ errors.password }}

            .d-grid
              button#login-btn.btn.btn-primary(type="submit") Log in

          p.pt-4.text-center New around here? You can always #[router-link(:to="{name: 'signup'}") Sign Up].
</template>
