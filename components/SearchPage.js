'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image
} from 'react-native';

export default class SearchPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      isLoading: false,
      message: ''
    };
  }

  _onSearchTextChanged = (e) => {
    this.setState({ searchString: e.nativeEvent.text });
  };

  _executeQuery = () => {
    this.setState({ isLoading: true });
    fetch('http://localhost:4000/api/leagues')
      .then(response => response.json())
      .then(data => this.setState({ leagues: data, isLoading: false }))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  };

  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Join a league!
        </Text>
        <Text style={styles.description}>
          Search for a league to join.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value=''
            onChange={this._onSearchTextChanged}
            placeholder='Search by league name'/>
          <Button
            onPress={this._executeQuery}
            color='#48BBEC'
            title='Go'
          />
        </View>
        <Image source={require('../Resources/trophy.gif')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
        { this.state.leagues.map(league =>
          <View key={league.id} style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.price}>{league.name}</Text>
            </View>
          </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 200,
    height: 200
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});
