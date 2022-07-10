import { View, Text, SafeAreaView, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Greeter from '../components/greeter'
import styles from '../styles/styles'
import CustomInput from '../components/customInput'
import Spacer from '../components/spacer'
import Category from '../components/category'
import Transaction from '../components/recipes'
import values from '../constants/values'
import { categories, transactions } from '../constants/data'
import { getName } from '../firebase/FirebaseApi'
import { FOODITEMS_ROUTE } from '../AppConstants'

export default function HomeScreen({ navigation })  {
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.horizontalPaddingView}>
            <Greeter user={{
                    img: 'https://media-exp1.licdn.com/dms/image/C5603AQGYfxv0fbIobw/profile-displayphoto-shrink_400_400/0/1626720808052?e=1662595200&v=beta&t=jL-Eak3EyvfYlAxveh3kClt-KKVxI8AKq6iUNxabPDs',
                    name: 'Mrinal'
                    }}
                    />
            <Spacer height={20}/>
            <CustomInput placeholder='Search' icon='search-outline' />
            <Spacer height={20} />
            <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                <Text style={values.h2Style}>Categories of food</Text>
                <Button
              title="Add food"
              />
            </View>
          <Spacer height={20} />
        </View>
        <View style={{paddingLeft: values.horizontalPadding}}>
            <FlatList
                horizontal
                data={categories}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Category category={item} onPress={(val) => console.warn(`Clicked ${val}`)} />}
            />
            <Button title="Inventory" onPress={() => navigation.navigate(FOODITEMS_ROUTE)}/>
        </View>

        <View style={styles.horizontalPaddingView}>
            <Spacer height={20} />
            <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                <Text style={values.h2Style}>Recipes</Text>
                <Button
              title="Add recipes"
              />
            </View>            
            <Spacer height={20} />
            <FlatList
                
                data={transactions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Transaction transaction={item} onPress={(val) => console.warn(`Clicked ${val}`)} />}
            />
        </View>
      
    </SafeAreaView>
  )
}