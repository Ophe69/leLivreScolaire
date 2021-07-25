import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

function Chapters(){

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainerStyle}> 
                <View style={{ flex: 1, backgroundColor:'#2ecc71'}}>
                    <Text>Create a view that queries the API for the list of chapters in the book you selected. For each chapter, display the associated image and title.
            Notice that some chapters may need to be deactivated (if valid is false ), shade them in grey in the list.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
    };


export default Chapters;

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
});