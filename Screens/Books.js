import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'





function Books(props){

    const [booksList, setBooksList] = useState([]);
    const [booksToDisplay, setBooksToDisplay] = ([]);
    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [state, setState] = useState(false);
    const [bookID, setBookID] = useState('');

    const navigation = props.navigation

    
    
    useEffect (() => {
        const getBooks = async () => { 
            const data = await fetch('https://api-dev.lelivrescolaire.fr/graphQL', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query:`query {viewer {books {hits {id displayTitle url subjects {name }levels {name} valid}}}}`,
                                    
                    variables: {},
            })
    });
    
    const response = await data.json();
    
    setBooksList(response.data.viewer.books.hits);
    setIsLoading(false);


        }
        getBooks()
    }, [])


    /*var booksToHide = 0;

    function filterByStatus(book) {
    // if valid
    if (book.valid === true) {
        
        //console.log(book.displayTitle);
        return true
        
    } else {
        booksToHide++;
        return false;
    }
    }
    const booksListValid = booksList.filter(filterByStatus);
    //booksListValid.forEach(book=>console.log("resultat forEach",book));
    //booksListValid.forEach(book=>console.log("resultat forEach",book.displayTitle,book.url ));
    
    console.log('Nb livres à afficher =', booksListValid.length); */
    //console.log('Nb livres à cacher = ', booksToHide);

    /* const booksToDisplaySorted = [];
    for(var i =0; i < booksToDisplay.length; i++ ){
        booksToDisplaySorted.push(booksToDisplay[i]);
        console.log(booksToDisplaySorted);
    } */
    console.log('Nb livres à afficher =', booksList.length);

    return(
        
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainerStyle}> 
                {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator}/>
        ) : (
                <View style={styles.cardsContainer}>
                    {booksList.map((book,i)=>(
                    <View key={book.id}>
                        <Card 
                            style={styles.cards}
                            opacity={book.valid ? 1 : 0.4}
                            >
                            <Card.Image source={{uri:book.url}}>
                            </Card.Image>
                    
                            <Card.Title style={styles.title}>{book.displayTitle}</Card.Title>
                            {/* <TouchableOpacity 
                                disabled={book.valid ? false : true} 
                                style={styles.cardBtn}
                                onPress={()=> {navigation.navigate('Chapters', { screen: 'Chapters' });}}
                                >
                                <Text style={styles.openBookText}>Ouvrir le livre</Text>
                                <Icon name='arrow-forward' color='#ffffff' />
                            </TouchableOpacity> */}
                            <Button style={styles.cardBtn}
                                        disabled={book.valid ? false : true} 
                                        type="clear"
                                        title='Extrait'
                                        titleStyle={{color: "red"}}
                                        onPress={()=> {navigation.navigate('Chapters', { screen: 'Chapters' });}}
                                />
                            
                        </Card>
                        
                    </View>
                ))}
                </View>
        )}
                
                

    
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
        marginTop: 20,
        
    },
    activityIndicator: {
        position: 'absolute',
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
    },

    contentContainerStyle: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    cardsCountainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
        alignContent: 'stretch',
        
    },
    cards: {
        height: 150,
        width: 100,

    },
    title: {
        display: 'flex',
        color: 'black',
        marginTop: 15,

    },
    cardBtn: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'red',
        margin: 20,
        marginTop: 5,
        padding: 0,
    },

    
});