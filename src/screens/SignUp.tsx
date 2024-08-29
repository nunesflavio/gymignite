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
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {api} from "@services/api";
import axios from "axios";
import {Alert} from "react-native";
import {AppError} from "@utils/AppError";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'Senha deve ter pelo menos 6 digitos'),
    password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref("password"), ""], "As senhas não conferem.")

});
export function SignUp() {

    /*const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');*/

    const toast = useToast()

    const navigator = useNavigation<AuthNavigatorRoutesProps>()
    const {control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });

    function handleGoBack() {
        navigator.goBack()
    }

    async function handleSignUp({ name, email, password }: FormDataProps) {
        console.log({ name, email, password })

        /*const response = await fetch('http://192.168.15.72:3333/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json()
        console.log(data)*/
        try {
            const response = await api.post('/users', { name, email, password })
            console.log(response.data)
        } catch (e) {
            const isAppError = e instanceof AppError
            const title = isAppError ? e.message : 'Nao foi possivel criar a conta. Tente novamente'
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'

            })

        }
        

    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} >
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

                    <Center flex={1} gap="$2">
                        <Heading color="$gray100">Crie sua conta</Heading>

                        <Controller render={({ field: {onChange, value}}) => (
                            <Input placeholder="Nome" onChangeText={onChange}  value={value}
                            errorMessage={errors.name?.message}
                            />

                            )}
                            name="name"
                            control={control}
                        />

                        <Controller render={({ field: {onChange, value}}) => (
                            <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
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

                        <Controller render={({ field: {onChange, value}}) => (
                            <Input placeholder="Confirmar a Senha" secureTextEntry
                                   onChangeText={onChange}  value={value} onSubmitEditing={handleSubmit(handleSignUp)}
                                   returnKeyType="send"
                                   errorMessage={errors.password_confirm?.message}
                            />
                        )}
                        name="password_confirm" control={control}
                        />

                        <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)}/>
                    </Center>

                    <Button title="Voltar para o login" variant="outline" mt="$12" onPress={handleGoBack} />
                </VStack>
            </VStack>
        </ScrollView>
    )
}