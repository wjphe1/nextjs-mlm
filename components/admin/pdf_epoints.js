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
        marginTop: 20,
    },
    success: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#ACFFB9',
        padding: 10,
        margin: -10,
        textAlign: 'center',
        color: '#3A3A3A',
    },
    failed: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#FFCFCF',
        padding: 10,
        margin: -10,
        textAlign: 'center',
        color: '#3A3A3A',
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
            const MyDoc = <Document title="E-Points Reimbursement" author="Reezqa Global">
                <Page size="A4" style={styles.page}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF6202' }}>E-Points Payout Slips</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.hcell}>Member ID</Text>
                        <Text style={styles.hcell}>Redeemed At</Text>
                        <Text style={styles.hcell}>Bank Details</Text>
                        <Text style={styles.hcell}>E-Points</Text>
                        <Text style={styles.hcell}>Status</Text>
                    </View>
                    {this.props.list.map((u, i) => 
                        <View key={i} style={styles.section}>
                            <Text style={styles.cell}>{u.requested_by.username}</Text>
                            <Text style={styles.cell}>{dateTime(u.created_at, 'date')}</Text>
                            <Text style={styles.cell}>{u.requested_by.bank_name} {u.requested_by.bank_account_number}</Text>
                            <Text style={styles.cell}>{u.epoint} Pts</Text>
                            <View style={styles.cell}>{(u.status === 'CANCELLED' || u.status === 'REJECTED') ? <Text style={styles.failed}>{u.status}</Text> : <Text style={styles.success}>{u.status}</Text>}</View>
                        </View>
                    )}
                    {!this.props.list.length && <Text style={{ margin: 20, textAlign: 'center'}}>No Payout Found</Text>}
                    <Text style={styles.normal}>**The payout is after the deduction of RM 0.50 transaction</Text>
                    <View style={styles.section}>
                        <View style={styles.totalpayout}>
                            <Text>Total Payout</Text>
                            <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF6202' }}>RM {this.props.total}</Text>
                        </View>
                    </View>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                </Page>
            </Document>

            return (<>
                {this.props.list.length ? <div className="ml-2 py-2">
                    <PDFDownloadLink document={MyDoc} fileName="Reimbursement_List.pdf" className={astyl.tbtn_reverse}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                    </PDFDownloadLink>
                </div> :
                <div className="ml-2 py-2" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                    <PDFDownloadLink document={MyDoc} fileName="Reimbursement_List.pdf" className={astyl.tbtn_reverse}>
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