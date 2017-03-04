import React from 'react';
import {
    TouchableWithoutFeedback,
    View
} from 'react-native';

class Cell extends React.Component {
    render() {
        const {cellSize} = this.props;
        console.log(cellSize);
        return (

            <TouchableWithoutFeedback >
                <View style={{
                    height: cellSize,
                    width: cellSize - 10,
                    backgroundColor: 'blue',
                    borderColor: '#000000',
                    borderRadius: 10,
                    borderWidth: 2,
                    margin: 3
                }}/>
            </TouchableWithoutFeedback>
        )
    }
}

export default Cell;