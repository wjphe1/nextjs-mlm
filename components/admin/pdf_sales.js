import React from 'react';
import astyl from '../../styles/module/admin/admin.module.scss'
import dateTime from '../dateTime';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'Helvetica'
    },
    userbox: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        width: 200,
        padding: 10,
    },
    invoice: {
        textAlign: 'right'
    },
    user: {  
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF6202',
        marginBottom: 5,
    },
    invno: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    normal: {
        color: '#878787',
        marginBottom: 3,
    },
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hcell_big: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        borderTopStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomStyle: 'solid',
        width: '60%',
        padding: 15,
        fontWeight: 'bold',
    },
    hcell: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        borderTopStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomStyle: 'solid',
        width: '20%',
        padding: 15,
        fontWeight: 'bold',
    },
    cell_big: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomStyle: 'solid',
        width: '60%',
        padding: 15,
        color: '#787878',
    },
    cell: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomStyle: 'solid',
        width: '20%',
        padding: 15,
        color: '#787878',
    },
    tsection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#FFF6F0',
        marginTop: 5,
    },
    tcell_big: {
        width: '60%',
        padding: 15,
    },
    tcell: {
        width: '20%',
        padding: 15,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF6202',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

class Exports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,
        };
    }

    componentDidMount() {
        // ************************************************************************************
        // BEGIN HACKY BS - wait 1ms for props and state to settle before rendering the PDF
        // react-pdf crashes if a re-render occurs when it's already rendering.
    
        this.setState({ ready: false });
        setTimeout(()=>{ this.setState({ ready: true }); }, 1);

        // END *******************************************************************************
    
    }

    render() {
        if (this.state.ready) {
            const MyDoc = <Document title="Sales Report" author="Reezqa Global">
                {this.props.list.map((u, i) => <Page key={i} size="A4" style={styles.page}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: 300, marginBottom: 20 }}>
                        <View style={styles.userbox}>
                            <Text style={styles.invno}>Received by:</Text>
                            <Text style={styles.user}>{u.customer ? u.customer.username : u.deliver_to}</Text>
                            {u.address ? <Text style={styles.normal}>{u.address}</Text> : <Text style={{ color: '#878787', fontStyle: 'italic' }}>No Fulfilment Required</Text>}
                        </View>
                        <View style={styles.invoice}>
                            <Text style={styles.invno}>Invoice ID: {u.order_number}</Text>
                            <Text style={styles.normal}>Order at {dateTime(u.created_at)}</Text>
                            <Text style={styles.normal}>Transferred from: {u.sales_by.username}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF6202' }}>Order Summary</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.hcell_big}>Product Name</Text>
                        <Text style={styles.hcell}>Quantity</Text>
                        <Text style={styles.hcell}>Pricing (MYR)</Text>
                    </View>
                    {u.order_items.map((v, j) => <View style={styles.section} key={j}>
                        <Text style={styles.cell_big}>{v.product_details.name}</Text>
                        <Text style={styles.cell}>{v.quantity}</Text>
                        <Text style={styles.cell}>RM {v.unit_price}</Text>
                    </View>)}
                    <View style={styles.tsection}>
                        <Text style={styles.tcell_big}>Subtotal</Text>
                        <Text style={styles.tcell}>{u.order_items.length}</Text>
                        <Text style={styles.tcell}>RM {u.total_price}</Text>
                    </View>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                </Page>)}
            </Document>

            return (<>
                {this.props.list.length ? <div className="ml-auto">
                    <PDFDownloadLink document={MyDoc} fileName="Sales_Report.pdf" className={astyl.tbtn}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export')}
                    </PDFDownloadLink>
                </div> :
                <div className="ml-auto" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                    <PDFDownloadLink document={MyDoc} fileName="Sales_Report.pdf" className={astyl.tbtn}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Export')}
                    </PDFDownloadLink>
                </div>
                }
            </>);
        } else {
            return null
        }
    }
}

export default Exports;