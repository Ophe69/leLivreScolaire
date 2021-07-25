import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

function Chapters(props){

    const [isLoading, setIsLoading] = useState(true);
    const [chaptersList, setChaptersList] = useState([]);
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterImage, setChapterImage] = useState('');
    const [chapterID, setChapterID] = useState('');

    const navigation = props.navigation

    


    useEffect (() => {
        const getChapters = async () => { 
            const data = await fetch('https://api-dev.lelivrescolaire.fr/graphQL', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        query: `
                            query chapters($bookId:Int){
                                viewer{
                                    chapters(bookIds:[$bookId]){
                                        hits{
                                            id 
                                            title
                                            url 
                                            valid
                                        }
                                    }
                                }
                            }`,
                        variables: {
                            bookId: 1339497
                        }
                    
            })
    });
    
    const response = await data.json();
    console.log('la response de chapters', response);
    setIsLoading(false);
    setChaptersList(response.data.viewer.chapters.hits)
    /* setChapterTitle(response.data.viewer.chapters.hits.title);
    setChapterImage(response.url); */
    //console.log('chapterliiiiiist:', chapterList)
    
        }
        getChapters()
    }, [])

    /*const listOfChapters = chaptersList.map((chapter,i)=>{
        setChapterTitle(chapter.title);
        setChapterImage(chapter.url);
        setChapterID(chapter.id);
    console.log('listOfCHapter', listOfChapters)
    })  */

    return(
    <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainerStyle}> 
                {isLoading ? (
        <ActivityIndicator style={styles.activityIndicator}/>
        ) : (
                <View style={styles.bookImage}>
                    <Image
                        source={require('../images/avatar1.png')}
                        size={150}
                    />
                </View>
                
        )}

        {/* <Card>
  <Card.Title>CARD WITH DIVIDER</Card.Title>
  <Card.Divider/>
  {
    users.map((u, i) => {
      return (
        <View key={i} style={styles.user}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: u.avatar }}
          />
          <Text style={styles.name}>{u.name}</Text>
        </View>
      );
    })
  }
</Card> */}
            
            </ScrollView>
        </SafeAreaView>
    );
}


export default Chapters;

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
    bookImage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    cards: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'wrap' 
    },
    title: {
        display: 'flex',
        color: 'black',
        marginTop: 10,

    },
    
});