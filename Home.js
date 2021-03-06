import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    StatusBar,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import './global'
import {api} from './eventdb'

const colors = {selected: '#ff5a5f', normal: '#484848', teal: '#008489', white: '#ffffff', statusBarLight: '#f0f0f0'};
const w = Dimensions.get('window').width;


export default class Home extends Component {

    state = {
        posters: null,
        isLoading: true,
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
        api.getTrending({
            onSuccess: (value) => {
                this.setState({posters: value, isLoading: false})

            },
            onFailed: (value) => {
                Alert.alert(JSON.stringify('Please check your network connection.'));
            }
        })
    }

    returnPosters = () => {
        var posters = [];
        for (let i = 0; i < this.state.posters.length; i++) {
            posters.push(
                <View key={i}>
                    <Text style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 22,
                        color: colors.normal,
                        marginLeft: 16
                    }}>{this.state.posters[i].name}</Text>
                    <View style={{height: w / 0.7, width: w, justifyContent: 'center', alignItems: 'center'}}>
                        <ImageBackground
                            source={{uri: ('http://assets.pecfest.in/postersFolder/' + this.state.posters[i].image)}}
                            style={{width: w - 32, height: (w - 32) / 0.7, backgroundColor: colors.statusBarLight}}/>
                    </View>
                </View>
            )
        }
        return posters
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <ScrollView style={styles.container}>
                    <StatusBar backgroundColor={colors.statusBarLight} barStyle="dark-content"/>
                    <Text style={styles.mainHadding}>Trending</Text>
                    {this.returnPosters()}
                </ScrollView>
            )
        } else {
            return (
                <ScrollView style={styles.container}>
                    <StatusBar backgroundColor={colors.statusBarLight} barStyle="dark-content"/>
                    <Text style={styles.mainHadding}>Trending</Text>
                    <ActivityIndicator size={'small'}/>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 8
    },

    mainHadding: {
        fontFamily: 'Montserrat-Medium',
        color: colors.normal,
        fontSize: 36,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },

    tabBarStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        elevation: 0,
    },

    underLineStyle: {
        backgroundColor: '#a51c30',
        height: 1.5,
    },
    indicator: {
        backgroundColor: colors.teal,
    },

    tab: {
        width: Dimensions.get('window').width / 2,
    },

    tabIcon: {
        height: 24,
        width: 24,
    },

    label: {
        color: '#484848',
        fontFamily: 'Montserrat-Bold',
    },
});