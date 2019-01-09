import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements'

export default class SearchText extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    this.input.focus()
  }

  onChange = value => {
    this.setState({ value })
  }

  onSubmitSearch = () => {
    const { submitSearch } = this.props

    submitSearch(this.state.value)
  }

  render() {
    return (
      <>
        <FormLabel containerStyle={styles.center}>Search an artist</FormLabel>
        <FormInput
          ref={input => (this.input = input)}
          onChangeText={this.onChange}
        />
        <FormValidationMessage />
        <Button title="Search" onPress={this.onSubmitSearch} />
      </>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})
