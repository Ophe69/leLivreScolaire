import React, {useState, useEffect} from 'react';
import { View, Text} from 'react-native';

function Lessons(){

    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect (() => {
        const getLesson = async () => { 
            const data = await fetch('https://api-dev.lelivrescolaire.fr/graphQL', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query:`query lessons ($chapterId:Int){viewer {pages(chapterIds:[$chapterId]){hits {id title url lessons{title } valid}}}}}`,             
                    variables: {
                        chapterId: 1990054
                    },
            })
    });
    
    const response = await data.json();
    
    console.log('la response de lessons est:',response)
    setIsLoading(false);


        }
        getLesson()
    }, [])


    return(
    <View style={{ flex: 1, backgroundColor: '#27b4d7', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <Text>Lesson Screen</Text>
    </View>
    );
}

export default Lessons;