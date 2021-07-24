import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';


function Books(props){

    const [booksList, setBooksList] = useState([]);
    const [isLoading, setIsLoging] = useState(true);
    const [dataSource, setDataSource] = useState(null);
    
    useEffect (() => {
        const displayBooks = async () => { 
            const data = await fetch('https://api-dev.lelivrescolaire.fr/graphQL', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query:`
                        query {
                            viewer {
                                books {
                                    hits {
                                        id 
                                        displayTitle 
                                        url 
                                        subjects {
                                            name 
                                        }
                                        levels {
                                            name
                                        }
                                        valid
                                    }
                                }
                            }
                        }
                    `,
                    variables: {},
            })
        
    });
    
    const response = await data.json();
    console.log('la response', response.data.viewer.books.hits[1].displayTitle);
    setBooksList(response.data.viewer.books.hits)
    console.log('******** BOOKSLIST******', booksList);
    console.log(booksList.length);



    //setBooksList({response})
    //console.log('voici la booklist', booksList)
        }
        displayBooks()
    }, [])


    
    

    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainerStyle}> 

                <View style={styles.cards}>
                    {booksList.map((book,i)=>(
                    <View key={i} style={{display:'flex',justifyContent:'center'}}>
                        <Card>
                            {/* <Card.Divider/> */}
                            <Card.Image source={require('../images/avatar1.png')}>
                            </Card.Image>
                            {/* <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements 
                            </Text> */}
                            <Card.Title>HELLO WORLD</Card.Title>
                            <Button
                                title='Ouvrir le livre'
                                icon={<Icon name='arrow-forward' color='#ffffff' />}
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                />
                        </Card>
                    </View>
                ))}
                </View>
                
                

    
            </ScrollView>
        </SafeAreaView>
    );
}

export default Books;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollview: {
        flex: 1,
        marginTop: 80,
        
    },
    contentContainerStyle: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    cards: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    
});