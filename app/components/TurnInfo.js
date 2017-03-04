import React from 'react';
import {
    View,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class TurnInfo extends React.Component {
    constructor(props) {
        super(props);
        this.renderUserInfo = this.renderUserInfo.bind(this);
    }

    render() {
        const {opponent, me} = this.props;
        return (
            <View>
                {this.renderUserInfo(opponent)}
                {this.renderUserInfo(me)}
            </View>
        )
    }

    renderUserInfo(user) {
        const {playerId} = this.props,
            isActive = playerId === user.id;

        return (
            <View style={[{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignSelf: 'stretch',
                height: 60,
                backgroundColor: '#9E9E9E',
                borderRadius: 20,
                borderWidth: 4,
                borderColor: 'white',
                justifyContent: 'center'
            }, isActive && {
                backgroundColor: '#4CAF50',
            }]}>
                <Text style={[{
                    alignSelf: 'center',
                    fontSize: 20,
                    fontFamily: 'Verdana',
                    color: 'black'
                }, isActive && {
                    color: 'white'
                }]}>{user.name}</Text>
                {isActive ? (<Icon name="bell" size={30} style={{
                        color: 'white',
                        marginTop: 10,
                        marginLeft: 20
                    }}/>) : null}
            </View>
        );
    }
}

export default TurnInfo;