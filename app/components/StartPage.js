import React from 'react';
import {
    View,
    Button,
    Navigator,
    TextInput,
    Image,
    AsyncStorage,
    Text
} from 'react-native';

import {LOADING_PAGE, RANKING_PAGE} from '../Pages';

class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };

        this.myNameKey = '@MyName:key';
        this.renderScene = this.renderScene.bind(this);
        this.goToLoadingPage = this.goToLoadingPage.bind(this);
        this.handleInputText = this.handleInputText.bind(this);
        this.getInitUserName = this.getInitUserName.bind(this);
        this.saveUserName = this.saveUserName.bind(this);
    }

    componentDidMount() {
        this.getInitUserName();
    }

    handleInputText(text) {
        this.setState({
            userName: text
        });
    }

    getInitUserName() {
        try {
            AsyncStorage.getItem(this.myNameKey).then(value => {
                if (value !== null) {
                    this.setState({
                        userName: value
                    });
                }
            });
        } catch (e) {
            //Error retrieving data
        }
    }

    saveUserName() {
        try {
            const {userName} = this.state;
            AsyncStorage.setItem(this.myNameKey, userName);
        } catch (error) {
            //error
        }
    }

    goToLoadingPage() {
        const {navigator}  = this.props,
            {userName} = this.state;
        this.saveUserName();
        navigator.push({
            id: LOADING_PAGE,
            name: LOADING_PAGE,
            userName
        })
    }

    goToRankingPage() {
        const {navigator}  = this.props;
        navigator.push({
            id: RANKING_PAGE,
            name: RANKING_PAGE
        })
    }

    renderScene() {
        console.log('test');
        const {userName} = this.state,
            isDisabled = userName.length === 0;
        return (
            <View style={{
                flex: 10,
                alignItems: 'stretch',
                justifyContent: 'center',
                padding: 10
            }}>
                <Image source={require('./img/logo.png')} style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginBottom: 10
                }}/>
                <TextInput
                    onChangeText={this.handleInputText.bind(this)}
                    value={userName}
                    placeholder="Enter your name"
                    style={{
                        marginBottom: 20,
                        fontSize: 22
                    }}
                />

                <Button
                    title="Let's play"
                    disabled={isDisabled}
                    onPress={this.goToLoadingPage.bind(this)}
                />

                <View style={{marginTop: 14}}>
                    <Button
                        title="Rankings"
                        onPress={this.goToRankingPage.bind(this)}
                    />
                </View>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={this.props.navigator}
            />
        );
    }
}


export default StartPage;