import { View, Text, SafeAreaView, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Greeter from '../components/greeter'
import styles from '../styles/styles'
import CustomInput from '../components/customInput'
import Spacer from '../components/spacer'
import Category from '../components/category'
// import Transaction from '../components/transaction'
import values from '../constants/values'
import { categories, transactions } from '../constants/data'
import { getName } from '../firebase/FirebaseApi'
import { FOODINPUT_ROUTE } from '../AppConstants'

export default function HomeScreen({ navigation })  {
    const [name, setName] = useState<string>('')
    useEffect(() => {
        async function namer () {
            const name = await getName()
            return name
        }
        namer().then(name => name ? setName(name) :  'there!').catch(console.error)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.horizontalPaddingView}>
                <Greeter user={{
                        img: 'https://media-exp1.licdn.com/dms/image/C5603AQGYfxv0fbIobw/profile-displayphoto-shrink_400_400/0/1626720808052?e=1662595200&v=beta&t=jL-Eak3EyvfYlAxveh3kClt-KKVxI8AKq6iUNxabPDs',
                        name: name
                        }}
                        />
                <Spacer height={20}/>
                <CustomInput placeholder='Search' icon='search-outline' />
                <Spacer height={20} />
                <Text style={values.h2Style}>Categories of food</Text>
                <Spacer height={20} />

            </View>
            <View style={{paddingLeft: values.horizontalPadding}}>
                <Button title="Add Food Item" onPress={() => navigation.navigate(FOODINPUT_ROUTE)}/>
                <FlatList
                    horizontal
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Category category={item} onPress={(val) => console.warn(`Clicked ${val}`)} />}
                />
            </View>

            <View style={styles.horizontalPaddingView}>
                <Spacer height={20} />
                <Text style={values.h2Style}>Recipes</Text>
                <Spacer height={20} />
                {/* <FlatList
                    
                    data={transactions}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Transaction transaction={item} onPress={(val) => console.warn(`Clicked ${val}`)} />}
                /> */}
            </View>
        
        </SafeAreaView>
    )
}

