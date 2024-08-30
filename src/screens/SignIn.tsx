import {
    Center,
    Heading,
    Image,
    ScrollView,
    Text, useToast,
    VStack,
} from '@gluestack-ui/themed'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import {useNavigation} from "@react-navigation/native";
import {AuthNavigatorRoutesProps} from "@routes/auth.routes";
import {Controller, useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {AppError} from "@utils/AppError";
import {useAuth} from "@hooks/useAuth";
import {useState} from "react";

type FormData = {
    email: string;
    password: string;
}

const signInSchema = yup.object({

    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'Senha deve ter pelo menos 6 digitos'),

});

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()
    const { signIn } = useAuth()
    const navigator = useNavigation<AuthNavigatorRoutesProps>()
    const {control, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: yupResolver(signInSchema),
    });

    function handleNewAccount() {
        navigator.navigate("signUp")
    }

    async function handleSignIn({ email, password }: FormData) {
        console.log({ email, password })
        try {
            //setIsLoading(true);
            await signIn(email, password);

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            console.log(title)
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
           // setIsLoading(false);
        }
    }

    return (

        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false} >
            <VStack flex={1} bg="$gray700">
                <Image
                    w="$full"
                    h={624}
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    position="absolute"
                />

                <VStack flex={1} px="$10" pb="$16">
                    <Center my="$24">
                        <Logo />

                        <Text color="$gray100" fontSize="$sm">
                            Treine sua mente e seu corpo
                        </Text>
                    </Center>

                    <Center gap="$2">
                        <Heading color="$gray100">Acesse sua conta</Heading>

                        <Controller render={({ field: {onChange, value}}) => (
                            <Input placeholder="E-mail"  keyboardType="email-address"
                                   autoCapitalize="none"
                                   onChangeText={onChange}  value={value}
                                   errorMessage={errors.email?.message}
                            />

                        )}
                                    name="email"
                                    control={control}
                        />

                        <Controller render={({ field: {onChange, value}}) => (
                            <Input placeholder="Senha" secureTextEntry
                                   onChangeText={onChange}  value={value}
                                   errorMessage={errors.password?.message}
                            />
                        )}
                                    name="password"
                                    control={control}
                        />

                        <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">Ainda não tem acesso</Text>

                        <Button title="Criar conta" onPress={handleNewAccount}/>
                    </Center>

                </VStack>
            </VStack>
        </ScrollView>
    )
}