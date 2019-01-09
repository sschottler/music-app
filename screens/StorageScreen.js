import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import { Text, Button, Divider } from 'react-native-elements'
import * as actions from '../actions'

export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'Storage'
  }

  state = {
    value: ''
  }

  async storeData() {
    const data = {
      value: 'Some test data'
    }

    const value = await actions.storeData('favoriteAlbums', data)

    if (value) {
    }
  }

  async retrieveData() {
    this.setState({
      value: ''
    })

    const data = await actions.retrieveData('favoriteAlbums')

    if (data) {
      console.log(data)
    }
  }

  async removeData() {
    const success = await actions.clearStorage()

    if (success) {
      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state
    return (
      <ScrollView style={styles.container}>
        <Text>storage screen</Text>
        <Button title="Store Data!" onPress={() => this.storeData()} />
        <Button title="Retrieve Data!" onPress={() => this.retrieveData()} />
        <Button title="Remove Data!" onPress={() => this.removeData()} />

        <Text>{value}</Text>

        <Divider style={{ backgroundColor: 'black' }} />
        <Text h3>Touchables</Text>

        <TouchableHighlight onPress={() => {}} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
