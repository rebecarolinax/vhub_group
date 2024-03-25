import { BoxUser, ContainerHeader, DataUser } from '../Container/Style'
import { HeaderImage } from '../Image/Style';
import { TextGray, UserTitle } from '../Title/Style'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { userDecodeToken } from '../../../Utils/Auth';
import { useEffect, useState } from 'react';

export const Header = ({ img, navigation }) => {
    const [name, setName] = useState('');

    async function profileLoad() {
        const token = await userDecodeToken();
        if (token) {
            setName(token.name);
        }
        console.log(token)
    }

    useEffect(() => {
        profileLoad();
    }, [])


    return (
        <ContainerHeader>
            <BoxUser>
                <HeaderImage
                    source={img}
                />
                <DataUser>
                    <TextGray>Bem vindo</TextGray>
                    <UserTitle>{name}</UserTitle>
                </DataUser>
            </BoxUser>
            <MaterialCommunityIcons name="bell" size={25} color='#ffffff' />
        </ContainerHeader>
    )
}