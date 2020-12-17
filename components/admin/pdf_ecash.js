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
    },
    normal: {
        color: '#878787',
        marginBottom: 3,
        paddingTop: 5,
        paddingBottom: 5,
    },
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    cell: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        borderBottomStyle: 'solid',
        width: '20%',
        padding: 15,
        color: '#787878',
    },
    totalpayout: {
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#FFF6F0',
        padding: 20,
        marginLeft: 'auto',
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
                {this.props.user.map((u, i) => <Page size="A4" key={i} style={styles.page}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF6202' }}>E-Cash Payout</Text>
                    </View>
                    <Text style={{ marginLeft: 10 }}>Minimum E-cash: RM {this.props.list[i].minimum_ecash}</Text>
                    <View style={{ margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%'}}>
                        <Text>{dateTime(this.props.list[i].start_date, 'date')} - {dateTime(this.props.list[i].end_date, 'date')}</Text>
                        <Text>Slip Generated at {dateTime(this.props.list[i].created_at)}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.hcell}>Member ID</Text>
                        <Text style={styles.hcell}>Eligible Date</Text>
                        <Text style={styles.hcell}>Bank Details</Text>
                        <Text style={styles.hcell}>E-Cash</Text>
                        <Text style={styles.hcell}>Payout</Text>
                    </View>
                    {u.payoutlist.map((v, j) => <View key={j} style={styles.section}>
                        <Text style={styles.cell}>{v.username}</Text>
                        <Text style={styles.cell}>{dateTime(v.updated_at, 'date')}</Text>
                        <Text style={styles.cell}>{v.bank_name} {v.bank_account_number}</Text>
                        <Text style={styles.cell}>RM {v.ecash}</Text>
                        <Text style={styles.cell}>RM {(v.ecash - 0.50).toFixed(2)}</Text>
                    </View>)}
                    {!u.payoutlist.length && <Text style={{ margin: 20, textAlign: 'center'}}>No Payout Found</Text>}
                    <Text style={styles.normal}>**The payout is after the deduction of RM 0.50 transaction</Text>
                    <View style={styles.section}>
                        <View style={styles.totalpayout}>
                            <Text>Total Payout</Text>
                            <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF6202' }}>RM {u.total_ecash}</Text>
                        </View>
                    </View>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                </Page>)}
            </Document>

            return (<>
                {this.props.list.length ? <div className="ml-2 py-2">
                    <PDFDownloadLink document={MyDoc} fileName="Ecash_Payout.pdf" className={astyl.tbtn_reverse}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                    </PDFDownloadLink>
                </div> :
                <div className="ml-2 py-2" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                    <PDFDownloadLink document={MyDoc} fileName="Ecash_Payout.pdf" className={astyl.tbtn_reverse}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
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