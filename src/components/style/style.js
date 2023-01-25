import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191A19',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    PressableContainer: {
        alignItems: 'center'
    },
    
    Title: {
        alignItems: 'center',
        top: -20 
    },  
    
    TextHead: {
        color: "#4E9F3D",
        fontSize:20,
        fontWeight:'bold'
    },
    
    LineHead_1: {
        padding: 5,
        width: 250,
        borderBottomColor: '#4E9F3D',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    
    LineHead_2: {
        padding: 5,
        width: 300,
        borderBottomColor: '#4E9F3D',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    
    LabelText:{
        color: '#4E9F3D',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 20
    },
    
    errorMessage: {
        color: 'red',
        fontSize: 12,
        paddingLeft: 10,
        marginBottom: -10,
    },
    
    Input: {
        borderColor: '#4E9F3D',
        borderWidth:1,
        marginTop: 15,
        height: 40,
        width: 350,
        borderRadius: 30,
        color: '#4E9F3D',
        paddingLeft: 20
    },
    
    Button: {
        backgroundColor: '#4E9F3D',
        borderRadius: 30,
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    
    ButtonText: {
        fontSize: 15
    },
    
    FlatList: {
        textAlign:'center',
        height: 80,
        marginTop: 20,
        flexGrow: 0
    },
    
    ListText:{
        color: '#4E9F3D',
        fontSize: 15
    }
    });

export default styles