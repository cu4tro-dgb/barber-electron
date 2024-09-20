<template>
  <main class="grid md:grid-cols-7 gap-x-10 p-4 place-items-center h-screen">
    <video
      class="hidden md:block md:col-span-4 rounded-4xl w-full h-[calc(100vh_-_32px)] object-cover"
      alt="video background to barbershop in login"
      src="/login/background.mp4"
      muted
      loop
      autoplay
    />
    <div
      class="md:col-span-3 space-y-4 relative w-full h-full grid place-content-center"
    >
      <CommonSystemcolor class="absolute right-0 top-0" />
      <h1 class="text-4xl font-bold tracking-tighter">Sign Up</h1>
      <p class="text-gray-500 font-light w-4/5 leading-tight">
        Sign in with your credentials to access your profile.
      </p>
      <UForm
        autocomplete="off"
        class="space-y-5"
        :state="formLogin"
        :schema="loginSchema"
        @submit="handleSubmitLogin"
        :validate-on="['submit']"
      >
        <UFormGroup
          :ui="{
            wrapper: 'relative',
            label: {
              wrapper:
                'absolute -top-2.5 left-4 z-10 dark:bg-[#111111] bg-white',
              base: 'font-light px-1'
            }
          }"
          label="Email"
          name="email"
        >
          <UInput
            variant="none"
            :ui="{
              rounded: 'rounded-2xl',
              padding: {
                sm: 'py-4'
              },
              variant: {
                none: 'ring-1 ring-gray-500 focus:ring-1 focus:ring-gray-500 '
              }
            }"
            autocomplete="email"
            placeholder="Email"
            v-model="formLogin.email"
          />
        </UFormGroup>
        <UFormGroup
          :ui="{
            wrapper: 'relative',
            label: {
              wrapper:
                'absolute -top-2.5 left-4 z-10  dark:bg-[#111111] bg-white',
              base: 'font-light px-1'
            }
          }"
          label="Password"
          name="password"
        >
          <UInput
            variant="none"
            :ui="{
              rounded: 'rounded-2xl',
              padding: {
                sm: 'py-4'
              },
              variant: {
                none: 'ring-1 ring-gray-500 focus:ring-1 focus:ring-gray-500'
              }
            }"
            type="password"
            autocomplete="current-password"
            placeholder="password"
            v-model="formLogin.password"
          />
        </UFormGroup>
        <UButton
          :ui="{
            rounded: 'rounded-4xl',
            padding: {
              sm: 'py-4'
            }
          }"
          color="white"
          type="submit"
          block
          label="Login"
          :loading="loading"
        />
      </UForm>
      <Transition name="fade">
        <p v-if="message" class="text-red-600 text-sm text-center font-medium">
          User or password incorrect
        </p>
      </Transition>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import z from 'zod'
  import type { FormSubmitEvent } from '#ui/types'

  definePageMeta({
    layout: 'auth-layout'
  })

  const config = useRuntimeConfig()
  const cookie = useCookie('token')

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
  const message = ref<string | null>(null)
  async function handleSubmitLogin(event: FormSubmitEvent<loginSchema>) {
    loading.value = true
    console.log(event.data)
    const { data, error, refresh } = await useFetch<{ token: string }>(
      'api/login',
      {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: event.data
      }
    )

    if (error.value) {
      loading.value = false
      message.value = error.value.message
      setTimeout(() => {
        message.value = null
      }, 2000)
      return
    }

    if (data.value) {
      cookie.value = data.value.token
      loading.value = false
    }
  }

  useSeoMeta({
    title: 'Login'
  })
</script>

<style></style>
