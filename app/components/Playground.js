import React from 'react';
import {
    Dimensions,
    View,
    StyleSheet
} from 'react-native';

import Cell from './Cell';


class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.cellSize = 0;

        this.mapFieldsProp = this.mapFieldsProp.bind(this);
    }

    componentWillMount() {
        const {size} = this.props,
            {width} = Dimensions.get('window');

        this.cellSize = width / size;
    }


    mapFieldsProp() {
        const {fields, onCellClick} = this.props;
        const players = [];
        fields.forEach(({key, playerId}) => players[key] = playerId);
        return [
            <Cell key={0} id={0} onCellClick={onCellClick} bottom right cellSize={this.cellSize}
                  playerId={players[0]}/>,
            <Cell key={1} id={1} onCellClick={onCellClick} bottom cellSize={this.cellSize} playerId={players[1]}/>,
            <Cell key={2} id={2} onCellClick={onCellClick} bottom left cellSize={this.cellSize} playerId={players[2]}/>,
            <Cell key={3} id={3} onCellClick={onCellClick} bottom right cellSize={this.cellSize}
                  playerId={players[3]}/>,
            <Cell key={4} id={4} onCellClick={onCellClick} bottom cellSize={this.cellSize} playerId={players[4]}/>,
            <Cell key={5} id={5} onCellClick={onCellClick} bottom left cellSize={this.cellSize} playerId={players[5]}/>,
            <Cell key={6} id={6} onCellClick={onCellClick} right cellSize={this.cellSize} playerId={players[6]}/>,
            <Cell key={7} id={7} onCellClick={onCellClick} cellSize={this.cellSize} playerId={players[7]}/>,
            <Cell key={8} id={8} onCellClick={onCellClick} left cellSize={this.cellSize} playerId={players[8]}/>
        ];

    }

    render() {
        const cells = this.mapFieldsProp();
        return (
            <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', top: 11}}>
                {cells}
            </View>

        )
    }
}


export default Playground;