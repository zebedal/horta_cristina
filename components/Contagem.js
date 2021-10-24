import React, {Fragment} from 'react';
import { Page, Document, StyleSheet, Text, View } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize:14
    },
    encomenda: {
        marginTop:20,
        borderBottomColor: 'rgba(0,0,0,.2)',
        borderBottomWidth: 1,
        paddingBottom:10,
        paddingTop:10
    },
    nome: {
        color:'#002766'
    },
    nomeCabaz: {
        marginTop:10,
        paddingLeft:10
    },  
    item: {
        fontSize: 10,
        fontWeight: 200,
        color: '#555454',
        paddingLeft:10
    }
});

const Contagem = ({ data }) => {

    console.log(data)

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.header}>
                    <Text>Encomendas</Text>
                    <Text>Quantidades</Text>
                </View>

                <Fragment>
                    {data.map(obj => {
                        return (
                            <View key={obj._id} style={styles.encomenda}>
                                <Text style={styles.nome}>
                                    {obj.nome}
                                </Text>
                                {obj.cabazes.map((cabaz, id) => {
                                    return (
                                        <Fragment key={`cab${id}`}>
                                            <Text style={styles.nomeCabaz}>{cabaz.nome}</Text>
                                            {cabaz.produtosCabaz.map((prod, idx) => <Text key={`cab${id}prod${idx}`} style={styles.item}>{prod}</Text>)}
                                        </Fragment>
                                    )
                                })}
                            </View>
                        )
                    })}
                </Fragment>

            </Page>
        </Document>
    )
}



export default Contagem