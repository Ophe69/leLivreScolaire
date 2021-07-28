import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView, FlatList, Button} from "react-native"
import { Card } from "react-native-elements"


const Chapters = (props) => {
  const [chaptersList, setChaptersList] = useState([])


  const getChapters = useCallback(async () => {
    const data = await fetch("https://api-dev.lelivrescolaire.fr/graphQL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}`,
        variables: {
          bookId: 1339497,
        },
      }),
    })

    const response = await data.json()
    setChaptersList(response?.data?.viewer?.chapters?.hits)
    console.log("chapterlist:", chaptersList)
  }, [])

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    getChapters()
  }, [])



  return (
    <SafeAreaView style={styles.container}>

      <FlatList 
        data={chaptersList}
        renderItem={({item}) => (
          <View style={styles.chapterPage}>
            <Card
                    opacity={item.valid ? 1 : 0.4}
                    
                >
                <Card.Title style={{fontSize: 25, color: '#27b4d7'}}>Chapitre </Card.Title>
                <Card.Divider/>
                    <View style={styles.chapterCard}>
                    <Image
                        style={styles.cardImage}
                        resizeMode="cover"
                        source={{ uri: item.url }}
                    />
                    <Text style={styles.cardText}>{item.title}</Text>
                    
                    </View>
                    <Button
                        style={styles.cardBtn}
                        disabled={item.valid ? false : true}
                        type="clear"
                        title="Voir la leçon"
                        titleStyle={{ color: "blue" }}
                        onPress={() => props.navigation.navigate("Leçons")}
                      />
                </Card>
          </View>
        )} 
        keyExtractor={(item) => item.id.toString()}
        />
    </SafeAreaView>
  );
}

export default Chapters

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    display: "flex",
  },
  scrollview: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  activityIndicator: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  chapterPage: {
    backgroundColor: "#27b4d7",
  },
  bookImage: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  cards: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  title: {
    display: "flex",
    color: "black",
    marginTop: 10,
  },
  image: {
    display: "flex",
  },
  item: {
    backgroundColor: "blue",
  },

  chapterCard: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  cardImage: {
    height: 100,
    width: 100,
    padding: 5,
  },

  cardText: {
    height: 100,
    width: 200,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    fontSize: 17,
    paddingTop: 20,
  },
  cardBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "blue",
    backgroundColor: "blue",
    margin: 20,
    marginTop: 5,
    padding: 0,
  },
})
