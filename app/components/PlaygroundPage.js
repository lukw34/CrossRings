import React from 'react';
import {
    View,
    Text,
    Navigator,
    Vibration,
    Button
} from 'react-native';


import Playground from './Playground';
import TurnInfo from './TurnInfo';

import {RESULT_PAGE, START_PAGE} from '../Pages';

class PlaygroundPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goToResultPage = this.goToResultPage.bind(this);
        this.handleResign = this.handleResign.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.state = {
            actualPlayerId: -1,
            fields: []
        };
    }

    componentDidMount() {
        const {socket, firstPlayer} = this.props;
        this.setState({
            actualPlayerId: firstPlayer
        });
        socket.on('result-winner', () => {
            this.goToResultPage({
                color: '#388E3C',
                information: 'You are the winner!',
                againButtonText: 'Ready for new challenge ?',
                icon: 'smile-o'
            });
        });

        socket.on('result-draw', () => {
            this.goToResultPage({
                color: '#536DFE',
                information: 'It\'s draw!',
                againButtonText: 'Try again!',
                icon: 'handshake-o'
            });
        });

        socket.on('result-looser', () => {
            this.goToResultPage({
                color: '#F44336',
                information: 'You are too weak!',
                againButtonText: 'Ready for revenge?',
                icon: 'frown-o'
            });
        });

        socket.on('player-disconnect', () => {
            this.goToResultPage({
                color: '#9E9E9E',
                information: 'Your opponent was too weak!',
                againButtonText: 'Try to find another one',
                icon: 'thumbs-up'
            });
        });

        socket.on('next-turn', ({fields, playerId}) => {
            const {me} = this.props;
            if (me.id === playerId) {
                Vibration.vibrate();
            }

            this.setState({
                fields,
                actualPlayerId: playerId
            })
        });
    }

    onCellClick(key) {
        const {fields, actualPlayerId} = this.state,
            {me, socket} = this.props,
            {id} = me,
            isMyTurn = me.id === actualPlayerId;
        if (isMyTurn) {
            const newFields = [...fields, {key, playerId: id, winner: null}];
            this.setState({
                fields: newFields
            });
            if (fields.length >= 8) {
                socket.emit('completed-draw');
            } else if (fields.length > 2 && this.calculateWinner(newFields)) {
                socket.emit('completed-winner', {id});
            } else
                socket.emit('turn-completed', {fields: newFields});
        }
    }

    calculateWinner(newFields = []) {
        const winnerCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]],
            {me} = this.props,
            {id} = me,
            actualPlayerFieldsKey = newFields
                .filter(({playerId}) => playerId === id)
                .map(({key}) => key),
            checkCombinations = (combination = [], keys = []) => {
                const matching = keys.filter(val => {
                    return combination.indexOf(val) !== -1;
                });

                return matching.length === 3;
            },
            foundedWinnerCombinations = winnerCombinations
                .filter(combination => checkCombinations(combination, actualPlayerFieldsKey));


        return foundedWinnerCombinations.length !== 0;
    }

    goToResultPage(props) {
        const {navigator} = this.props;
        navigator.push({
            id: RESULT_PAGE,
            name: RESULT_PAGE,
            ...props
        });
    }

    handleResign() {
        const {socket, navigator} = this.props;
        socket.disconnect();
        navigator.push({
            id: START_PAGE,
            name: START_PAGE
        });
    }

    render() {
        const {navigator} = this.props;
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={navigator}
            />
        )
    }

    renderScene() {
        const {me, opponents} = this.props,
            {actualPlayerId, fields} = this.state,
            isMyTurn = actualPlayerId === me.id;

        return (
            <View>
                <View >
                    <Playground isMyTurn={isMyTurn} onCellClick={this.onCellClick} fields={fields} size={3}/>
                </View>
                <View style={{
                    marginBottom: 20,
                    marginTop: 30
                }}>
                    <TurnInfo me={me} opponent={opponents[0]} playerId={actualPlayerId}/>
                </View>
                <Button color="#C62828" title="Resign" onPress={this.handleResign}/>
            </View>
        );
    }
}

export default PlaygroundPage;