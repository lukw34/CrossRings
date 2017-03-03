import React from 'react';
import {
    Dimensions,
    View
} from 'react-native';

import Cell from './Cell';

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: []
        };
    }

    componentWillMount() {
        const {size} = this.props,
            cells = [],
            {width} = Dimensions.get('window'),
            cellSize = width / size,
            boardSize = size * size;

        for (let index = 0; index < boardSize; index++) {
            cells.push(<Cell key={index} cellSize={cellSize}/>)
        }

        this.setState({
            cells
        })
    }

    render() {
        const {cells} = this.state;
        return (
            <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                {cells}
            </View>
        );
    }
}

export default Playground;