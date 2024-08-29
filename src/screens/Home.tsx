import {Center, Heading, HStack, Text, VStack} from "@gluestack-ui/themed";
import {HomeHeader} from "@components/HomeHeader";
import {Group} from "@components/Group";
import {useState} from "react";
import {FlatList} from "react-native";
import {ExerciseCard} from "@components/ExerciseCard";
import {useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@routes/app.routes";

export function Home() {
    const [exercises, setExercises] = useState(['Puxada frontal',
        'Remada curvada',
        'Remada unilateral',
        'Levantamento Barra',
        'Agachamento',
        'Flexadora',
        'Barra dupla',])
    const [groupSelected, setGroupSelected] = useState("Costas")
    const [groups, setGroups] = useState(["Costa", "Biceps", "Tripeps", "Ombro"])

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails() {
        navigation.navigate("exercise")
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList data={groups} keyExtractor={(item) => item} renderItem={({ item }) => (
                <Group name={item} isActive={groupSelected.toLowerCase() === item.toLowerCase()} onPress={() => setGroupSelected(item)} />

            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle= {{ paddingHorizontal: 25 }}
                      style={{ marginVertical: 40, maxHeight: 40, minHeight: 40}}
            />

            <VStack px="$8" flex={1}>
                <HStack justifyContent="space-between" mb="$5" alignItems="center">
                    <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
                        Exercicios
                    </Heading>

                    <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
                </HStack>

                <FlatList data={exercises} renderItem={(() => <ExerciseCard onPress={handleOpenExerciseDetails} /> )}
                          keyExtractor={(item) => item}
                 showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}
                />

            </VStack>
        </VStack>
    )
}
