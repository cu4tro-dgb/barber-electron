<template>
  <main class="grid md:grid-cols-3 gap-x-10 p-4">
    <div class="col-span-2 grid place-items-center">
      <UForm
        class="space-y-3"
        :state="formLogin"
        :schema="loginSchema"
        @submit="handleSubmitLogin"
      >
        <UFormGroup label="Email" name="email">
          <UInput autocomplete="email" placeholder="Email" v-model="formLogin.email"></UInput>
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput
            type="password"
            autocomplete="current-password"
            placeholder="password"
            v-model="formLogin.password"
          ></UInput>
        </UFormGroup>
        <UButton type="submit" block label="Login" :loading="loading" />
      </UForm>
    </div>
    <video
      class="rounded-2xl w-full h-[calc(100vh_-_32px)] object-cover"
      alt="video background to barbershop in login"
      src="/login/background.mp4"
      muted
      loop
      autoplay
    />
  </main>
</template>

<script lang="ts" setup>
import z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth-layout'
})

const config = useRuntimeConfig()
const cookie= useCookie('token')

const formLogin: { email?: string; password?: string } = reactive({
  email: undefined,
  password: undefined
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type loginSchema = z.output<typeof loginSchema>

const loading = ref(false)
async function handleSubmitLogin(event: FormSubmitEvent<loginSchema>) {
  loading.value = true
  console.log(event.data)
  const { data, pending, error, refresh } = await useFetch<{token: string}>('api/login', {
    method: 'POST',
    baseURL: config.public.apiBase,
    body: event.data
  })

  if(error.value){
    loading.value = false
    return 
  }

  if(data.value){
    cookie.value = data.value.token
    loading.value = false
  }
}

useSeoMeta({
  title: 'Login'
})
</script>

<style></style>
