import React, { useState, useEffect } from "react"
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from "react-native"
import { Card, Button } from "react-native-elements"

function Books(props) {
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const getBooks = async () => {
    const data = await fetch("https://api-dev.lelivrescolaire.fr/graphQL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query {viewer {books {hits {id displayTitle url subjects {name }levels {name} valid}}}}`,

        variables: {},
      }),
    })

    const response = await data.json()

    setBooksList(response?.data?.viewer?.books?.hits)
    setIsLoading(false)
  }

  useEffect(() => {
      // noinspection JSIgnoredPromiseFromCall
    getBooks()
  }, [])

  console.log("Nb livres à afficher =", booksList.length)

  return (
    <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <View style={styles.cardsContainer}>
            <FlatList 
            data={booksList}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.cards}>
                <Card opacity={item.valid ? 1 : 0.4}>
                        <Card.Image source={{ uri: item.url }}/>
                        <Card.Title style={styles.title}>{item.displayTitle}</Card.Title>
                      <Button
                        style={styles.cardBtn}
                        disabled={item.valid ? false : true}
                        type="clear"
                        title="Extrait"
                        titleStyle={{ color: "red" }}
                        onPress={() => props.navigation.navigate("Chapitres")}
                      />
                    </Card>
              </View>
            )} 
            keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
    </SafeAreaView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
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
    cardsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cards: {
    width: "50%",
  },
  title: {
    display: "flex",
    color: "black",
    marginTop: 15,
  },
  cardBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    margin: 20,
    marginTop: 5,
    padding: 0,
  },
})
