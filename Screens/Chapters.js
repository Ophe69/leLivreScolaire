import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView } from "react-native"
import { Card } from "react-native-elements"

const Chapters = () => {
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
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainerStyle}>
        {/* <View style={styles.bookImage}>
                    <Image
                        source={require('../images/avatar1.png')}
                        size={150}
                    />
                    <Text>Titre du Livre</Text>
                </View>     */}

        {
            // TODO: Using a map for an unknown number of elements to show is a bad idea. Here's why: https://stackoverflow.com/a/48104178. How would you adapt this code?
            chaptersList.map((chapter, i) => {
          return (
            <View key={i} style={styles.chapterPage}>
              <Card opacity={chapter.valid ? 1 : 0.4}>
                <Card.Title style={{ fontSize: 25, color: "#27b4d7" }}>Chapitre {i}</Card.Title>
                <Card.Divider />
                <View style={styles.chapterCard}>
                  <Image
                    style={styles.cardImage}
                    resizeMode="cover"
                    source={{ uri: chapter.url }}
                  />
                  <Text style={styles.cardText}>{chapter.title}</Text>
                </View>
              </Card>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
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
    fontSize: 15,
    paddingTop: 20,
  },
})
