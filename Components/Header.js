import { Dimensions } from 'react-native';

import { View, Text, StyleSheet } from 'react-native';

const Header = ({ children, name }) => {
    return (
        <View>
            <Text style={styles.headerStyle}>Welcome to {name}</Text>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    headerStyle: {
        borderColor: 'purple',
        borderWidth: 2,
        margin: 15,
        fontSize: 22,
        padding: 10,
    }
})

export default Header;