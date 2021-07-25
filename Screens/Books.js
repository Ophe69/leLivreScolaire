import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView, FlatList,} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const URL= https://api-dev.lelivrescolaire.fr/graphQL

function Books(props){

    const [booksList, setBooksList] = useState([]);
    //const [booksToDisplay, setBooksToDisplay] = ([]);
    const [isLoading, setIsLoging] = useState(true);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [state, setState] = useState(false);

    
    useEffect (() => {
        const getBooks = async () => { 
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
    //console.log('la response', response.data.viewer.books.hits[1].displayTitle);
    
    setBooksList(response.data.viewer.books.hits);
    setImage(booksList.url);
    setTitle(booksList[7].displayTitle);

    //console.log(title);
    
    //console.log('******** BOOKSLIST******', booksList);
    //console.log(booksList.length);

    

   
    
    /* const booksListValid = booksList.map((book,i)=>{
            return {title:book.displayTitle, img:book.url, state:book.valid}
    }) */
    
    //console.log('booksList validée', booksListValid);


    //setBooksList({response})
    //console.log('voici la booklist', booksList)
        }
        getBooks()
    }, [])

    //viens de déplacer ce bloc hors du hook= pas cahngement
    var booksToHide = 0;

    function filterByStatus(book) {
    // if valid
    if (book.valid === true) {
        console.log(book.displayTitle);
        //console.log(book.url);
        return <h1>{book.displayTitle}</h1>
        
    } else {
        booksToHide++;
        return false;
    }
    }
    const booksToDisplay = booksList.filter(filterByStatus);
    

    //console.log('Nb livres à afficher =', booksToDisplay.length);
    //console.log('Nb livres à cacher = ', booksToHide);

    /* const booksToDisplaySorted = [];
    for(var i =0; i < booksToDisplay.length; i++ ){
        booksToDisplaySorted.push(booksToDisplay[i]);
        console.log(booksToDisplaySorted);
    } */


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainerStyle}> 

                <View style={styles.cards}>
                    {booksToDisplay.map((book,i)=>(
                    <View key={i}>
                        <Card>
                            <Card.Image source={require('../images/avatar2.png')}>
                            </Card.Image>
                    
                            <Card.Title style={styles.title}>{title}</Card.Title>
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
        //marginTop: 2,
        
    },
    contentContainerStyle: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    cards: {
        flex: 3,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    title: {
        display: 'flex',
        color: 'black'

    },
    
});