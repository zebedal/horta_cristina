import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from '../components/invoice/InvoiceTitle'
import BillTo from '../components/invoice/BillTo'
import InvoiceNo from '../components/invoice/InvoiceNo'
import InvoiceItemsTable from '../components/invoice/InvoiceItemsTable'
/* import logo from '../public/assets/logo.png'  */
 

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    {/* <Image style={styles.logo} src={logo} alt=""/> */}
                    <InvoiceTitle title='Invoice'/>
                    <InvoiceNo invoice={invoice}/>
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                
                </Page>
            </Document>
        );
  
  export default Invoice