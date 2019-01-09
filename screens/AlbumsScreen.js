import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View
} from 'react-native'
import { Icon } from 'react-native-elements'
import CardList from '../components/CardList'
import SearchText from '../components/SearchText'
import * as actions from '../actions'

export default class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title: 'Albums'
  }

  state = {
    albums: [],
    isFetching: false,
    artist: ''
  }

  searchTracks = artist => {
    this.setState({ isFetching: true, artist })

    actions
      .searchTracks(artist)
      .then(albums => {
        this.setState({ albums, isFetching: false })
      })
      .catch(err => this.setState({ albums: [], isFetching: false }))
  }

  async saveAlbumToFavorites(album) {
    const favoriteAlbums = (await actions.retrieveData('favoriteAlbums')) || {}

    if (favoriteAlbums[album.id]) {
      Alert.alert(
        'Cannot add Album!',
        'Album already in Favorites!',
        [{ text: 'Continue', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      )
      return false
    }

    favoriteAlbums[album.id] = album
    const success = await actions.storeData('favoriteAlbums', favoriteAlbums)

    if (success) {
      Alert.alert(
        'Album added!',
        `Album ${album.title} from ${
          this.state.artist
        } was added to Favorites!`,
        [{ text: 'Continue', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      )
    }
  }

  renderBottomNavigation = album => {
    const { artist } = this.state

    return (
      <View style={styles.albumMenu}>
        <Icon
          onPress={() => {}}
          raised
          name="music"
          type="font-awesome"
          color="#f50"
          size={30}
        />
        <Icon
          onPress={() =>
            this.props.navigation.navigate('AlbumDetail', { album, artist })
          }
          raised
          name="info"
          type="font-awesome"
          color="#f50"
          size={30}
        />
        <Icon
          onPress={() => this.saveAlbumToFavorites(album)}
          raised
          name="thumbs-up"
          type="font-awesome"
          color="#f50"
          size={30}
        />
      </View>
    )
  }

  renderAlbumView = () => {
    const { albums, isFetching } = this.state

    return (
      <ScrollView style={styles.container}>
        <SearchText submitSearch={this.searchTracks} />
        {albums.length > 0 && !isFetching && (
          <CardList
            data={albums}
            imageKey={'cover_big'}
            titleKey={'title'}
            bottomView={this.renderBottomNavigation}
          />
        )}
        {albums.length === 0 && isFetching && (
          <ActivityIndicator size="large" color="#3399ff" />
        )}
      </ScrollView>
    )
  }

  render() {
    return this.renderAlbumView()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  albumMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
