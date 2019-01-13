import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt",
    };
    // state parecido com vue
    // toda vez que ele ver uma alteração, ele chama render()
    state = {
        productInfo: {},
        docs: [],
        page: 1,
    };

    // método disparado automaticamente
    componentDidMount() {
        this.loadProducts();
    }

    // se a não fizer arrow functions, ela passa a não entender o this
    // ou seja, não daria pra usar o this.
    // arrow function herda o escopo acima dele (componentDidMount)
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;
        this.setState({ 
            docs: [...this.state.docs, ...docs], 
            productInfo, 
            page
        });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;
        
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    // return direto, uso parenteses depois de =>
    renderItem = ({ item }) => (
        // sempre precisa de View
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}> {item.title} </Text>
            <Text style={styles.productDescription}> {item.description} </Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate('Product', { product: item });
                }}>
                <Text style={styles.productButtonText}> Acessar </Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1} // quando tiver 90% da lista dado scroll, eu carrego os demais
                />
                {/* {this.state.docs.map(product => (
                   <Text key={product._id}>
                        {product.title}
                    </Text>
                ))} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // ocupar todo espaço
        backgroundColor: "#FAFAFA",
    },

    list: {
        padding: 20,
    },

    productContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20, 
        marginBottom: 20,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24,
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold",
    }
});