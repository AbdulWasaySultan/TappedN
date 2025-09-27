import React, {Children} from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';

type RowContainerProps = {
    children: React.ReactNode;
    style?: ViewStyle;
}


const RowContainer: React.FC<RowContainerProps> = ({ children, style }) => {
    return (
        <View style={styles.rowContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({

    rowContainer:{    
    width : '90%',
    height :'6%',
    // backgroundColor : '#cdcdcd',
    // borderRadius : 10,
    padding : 10,
    margin : 10,
    alignSelf : 'center',

    }
})

export default RowContainer;