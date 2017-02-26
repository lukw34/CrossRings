import React from 'react';
import {
    View,
    Button,
    Navigator,
    TextInput,
    Image,
    AsyncStorage
} from 'react-native';

import {LOADING_PAGE} from '../Pages';

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

    render() {
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={this.props.navigator}
            />
        );
    }

    getInitUserName() {
        try {
            AsyncStorage.getItem(this.myNameKey).then(value => {
                console.log(value);
                if(value !== null) {
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
        } catch(error) {
            //error
        }
    }

    goToLoadingPage() {
        const {navigator}  = this.props;
        this.saveUserName();
        navigator.push({
            id: LOADING_PAGE,
            name: LOADING_PAGE,
        })
    }

    renderScene() {
        const {userName} = this.state;
        return (
            <View style={{flex: 10,
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
                    style={{
                        marginBottom: 20,
                        fontSize: 25
                    }}
                />
                <Button
                    title="Let's play"
                    onPress={this.goToLoadingPage.bind(this)}
                />
            </View>
        );
    }
}


export default StartPage;