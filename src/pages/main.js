import React, { Component } from 'react'

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import api from '../services/api'

export default class Main extends Component {

    static navigationOptions = {
        title: 'JsHunt'
    }

    state = {
        docs: [],
        page: 1,
        productInfo: []
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async(page = 1) => {
        const response = await api.get(`/products?page=${page}`)

        const { docs, ...productInfo } = response.data

        this.setState({ docs: [...this.state.docs, ...docs], productInfo, page })
    }

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity 
                style={styles.productButton}
                onPress={() => {this.props.navigation.navigate('Product', { product: item })}}>
                    <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    loadMore = () => {
        const { page, productInfo } = this.state

        if(page === productInfo.pages) return

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        padding: 20,
    },
    productContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    productTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333333'
    },
    productDescription: {
        fontSize: 16,
        color: '#999999',
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#da552f',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#da552f'
    }
})