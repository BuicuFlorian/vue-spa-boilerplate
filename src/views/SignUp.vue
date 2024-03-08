<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { object, string, ref } from 'yup';
import { useToggle } from '@vueuse/core';
import { useRouter } from 'vue-router';

import { alert } from '@/utils/alert';
import { userApi } from '@/api/user';

const router = useRouter();
const [ showPassword, togglePassword ] = useToggle();
const [ showPasswordConfirmation, togglePasswordConfirmation ] = useToggle();
const passwordInputType = computed(() => showPassword.value ? 'text' : 'password');
const passwordConfirmationInputType = computed(() => showPasswordConfirmation.value ? 'text' : 'password');
const loginSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(8),
  passwordConfirmation: string().required().min(8).oneOf([ref('password')], 'Passwords do not match')
});
const { errors, defineField, meta, handleSubmit } = useForm({ validationSchema: loginSchema });
const [ email, emailAttrs ] = defineField('email', { validateOnModelUpdate: false });
const [ password, passwordAttrs ] = defineField('password', { validateOnModelUpdate: false });
const [ passwordConfirmation, passwordConfirmationAttrs ] = defineField('passwordConfirmation', {
  validateOnModelUpdate: false
});

/**
 * Authenticate the given user.
 *
 * @return {Promise<void>}
 */
const register = handleSubmit(async values => {
  try {
    await userApi.registerUser({
      email: values.email,
      password: values.password
    });

    email.value = null;
    password.value = null;
    passwordConfirmation.value = null;

    router.push({ name: 'login' });

    alert.toast('success', 'Your account was successfully created.')
  } catch (error: any) {
    const message = error.error 
      ? error.error
      : 'Whoops, something went wrong. Please try again.';

    alert.toast('error', message);
  }
})
</script>

<template lang="pug">
.container
  .row
    #login.col-md-4.offset-md-4.pt-5
      h1.text-center.py-5 Sign Up

      .card 
        .card-body
          form(@submit="register")
            .mb-4
              label.form-label(for="email") Email address
              input#email.form-control(:class="{'input-error': errors.email && meta.touched }" name="email" type="email" v-model="email" :bind="emailAttrs" placeholder="john@doe.com")

              .validation-error(v-if="errors.email && meta.touched")
                span {{ errors.email }}

            .mb-4
              label.form-label(for="password") Password

              .input-group
                input#password.form-control(:class="{'input-error': errors.password && meta.touched }" name="password" :type="passwordInputType" v-model="password" :bind="passwordAttrs" autocomplete="new-password")
                span.input-group-text.pointer(@click='togglePassword()')
                  i.fa.fa-eye

              .validation-error(v-if="errors.password && meta.touched")
                span {{ errors.password }}

            .mb-5
              label.form-label(for="password-confirmation") Password Confirmation

              .input-group
                input#password-confirmation.form-control(:class="{'input-error': errors.passwordConfirmation && meta.touched }" name="password-confirmation" :type="passwordConfirmationInputType" v-model="passwordConfirmation" :bind="passwordConfirmationAttrs" autocomplete="new-password")
                span.input-group-text.pointer(@click='togglePasswordConfirmation()')
                    i.fa.fa-eye

              .validation-error(v-if="errors.passwordConfirmation && meta.touched")
                span {{ errors.passwordConfirmation }}
            
            .d-grid
              button.btn.btn-primary(type="submit") Sign up
</template>