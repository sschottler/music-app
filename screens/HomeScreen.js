import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { List, Icon, Card, Text } from 'react-native-elements'

const menuList = [
  {
    title: 'Search Albums',
    subtitle: 'Search your favorite music',
    icon: 'music',
    navigateTo: 'Albums'
  },
  {
    title: 'Favorite Collections',
    subtitle: 'Access your favorite albums',
    icon: 'heart',
    navigateTo: 'Favorite'
  },
  {
    title: 'Settings',
    subtitle: 'Customize your app',
    icon: 'cog',
    navigateTo: 'Albums'
  }
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{ backgroundColor: '#eaeaea', marginTop: 0 }}>
          {menuList.map((item, index) => {
            return (
              <Card key={index} title={item.title}>
                <View style={styles.cardView}>
                  <Text style={{ marginBottom: 10 }}>{item.subtitle}</Text>
                  <Icon
                    raised
                    name={item.icon}
                    type="font-awesome"
                    color="#f50"
                    size={30}
                    onPress={() =>
                      this.props.navigation.navigate(item.navigateTo)
                    }
                  />
                </View>
              </Card>
            )
          })}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 70
  },
  cardView: {
    alignItems: 'center'
  }
})
