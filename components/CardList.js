import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Card, Text } from 'react-native-elements'

export default class CardList extends Component {
  renderData() {
    const { data, imageKey, titleKey, bottomView } = this.props

    // return data.map((item, index) => (
    //   <Card key={index} title={item[titleKey]} image={{ uri: item[imageKey] }}>
    //     {bottomView(item)}
    //   </Card>
    // ))

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
              title={item[titleKey]}
              image={{ uri: item[imageKey] }}>
              {bottomView(item)}
            </Card>
          )
        }}
      />
    )
  }

  render() {
    const { data } = this.props

    if (data && data.length > 0) {
      return this.renderData()
    }

    return (
      <View>
        <Text> Loading Data...</Text>
      </View>
    )
  }
}
