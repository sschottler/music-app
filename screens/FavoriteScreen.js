import React from 'react'
import { ScrollView, View, StyleSheet, Linking } from 'react-native'
import { Card, Button, List, ListItem, Icon } from 'react-native-elements'
import _ from 'lodash'
import * as actions from '../actions'

export default class FavoriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorite Albums'
  }

  state = {
    favoriteAlbums: undefined
  }

  componentDidMount() {
    this.getFavoriteAlbums()
  }

  getFavoriteAlbums = async () => {
    const favoriteAlbums = await actions.retrieveData('favoriteAlbums')
    console.log(favoriteAlbums)
    if (favoriteAlbums) {
      this.setState({ favoriteAlbums })
    }
  }

  deleteAlbum = async albumId => {
    const { favoriteAlbums } = this.state

    delete favoriteAlbums[albumId]
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums)

    if (success) this.setState({ favoriteAlbums })
  }

  renderFavoriteAlbums() {
    const { favoriteAlbums } = this.state

    if (favoriteAlbums) {
      return _.map(favoriteAlbums, (album, id) => {
        return (
          <View key={id}>
            <Card title={album.title}>
              <Button
                title="Delete Album"
                raised
                backgroundColor="#f50"
                icon={{ name: 'trash', type: 'font-awesome' }}
                onPress={() => this.deleteAlbum(album.id)}
              />
              {this.renderFavoriteTracks(album.tracks)}
            </Card>
          </View>
        )
      })
    }
  }

  renderFavoriteTracks = tracks => {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            leftIcon={{ name: 'play-arrow' }}
            rightIcon={
              <Icon
                raised
                name="music"
                type="font-awesome"
                color="#f50"
                onPress={() => Linking.openURL(track.preview)}
              />
            }
          />
        )
      })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={styles.listContainer}>
          {this.renderFavoriteAlbums()}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  listContainer: {
    backgroundColor: '#eaeaea'
  }
})
