import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: ''
        };
        this.borderWidth = 8;
        this.getBorderStyle = this.getBorderStyle.bind(this);
        this.getIcon = this.getIcon.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    getBorderStyle() {
        let style = {};
        const {right, left, top, bottom} = this.props;
        if (right) {
            style = {...style, borderRightWidth: this.borderWidth}
        }

        if (left) {
            style = {...style, borderLeftWidth: this.borderWidth}
        }

        if (top) {
            style = {...style, borderTopWidth: this.borderWidth}
        }

        if (bottom) {
            style = {...style, borderBottomWidth: this.borderWidth}
        }

        return style;
    }

    getIcon() {
        const {playerId} = this.props;

        if (playerId === 0) {
            return 'circle-o';
        }

        if (playerId === 1) {
            return 'close';
        }
    }

    handleCellClick() {
        const {playerId, onCellClick, id} = this.props;
        if(!playerId) {
            onCellClick(id);
        }
    }

    render() {
        const {cellSize} = this.props,
            border = this.getBorderStyle(),
            icon = this.getIcon();
        return (
            <TouchableWithoutFeedback onPress={this.handleCellClick}>
                <View style={{
                    justifyContent: 'center',
                    height: cellSize,
                    width: cellSize - 10,
                    borderColor: '#000000',
                    ...border
                }}>
                    {icon ? <Icon name={icon} style={{alignSelf: 'center'}} size={80}/> : null}
                </View>

            </TouchableWithoutFeedback>
        )
    }
}


export default Cell;