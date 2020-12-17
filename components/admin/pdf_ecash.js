import React from 'react';
import astyl from '../../styles/module/admin/admin.module.scss'
import dateTime from '../dateTime';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor: '#E4E4E4',
        fontSize: 10,
    },
    section: {
        padding: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cell: {
        width: '20%'
    }
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
                    <View style={styles.section}>
                        <Text style={styles.cell}>Member ID</Text>
                        <Text style={styles.cell}>Eligible Date</Text>
                        <Text style={styles.cell}>Bank Details</Text>
                        <Text style={styles.cell}>E-Cash</Text>
                        <Text style={styles.cell}>Payout</Text>
                    </View>
                    {u.payoutlist.map((v, j) => <View key={j} style={styles.section}>
                        <Text style={styles.cell}>{v.username}</Text>
                        <Text style={styles.cell}>{dateTime(v.updated_at, 'date')}</Text>
                        <Text style={styles.cell}>{v.bank_name} {v.bank_account_number}</Text>
                        <Text style={styles.cell}>RM {v.ecash}</Text>
                        <Text style={styles.cell}>RM {(v.ecash - 0.50).toFixed(2)}</Text>
                    </View>)}
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