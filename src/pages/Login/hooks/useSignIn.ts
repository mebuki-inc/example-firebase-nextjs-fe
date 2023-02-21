import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  mailAddress: z.string().email('メールアドレスを正しく入力して下さい'),
  password: z.string().min(8, '8文字以上').max(32, '32文字以下')
})

type SignInInput = z.infer<typeof schema>

export const useSignIn = () => {
  const form = useForm<SignInInput>({
    defaultValues: {
      mailAddress: '',
      password: ''
    },
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  return {
    form,
    isValid: form.formState.isValid
  }
}
