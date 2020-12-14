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
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.cell}>Transfer ID</Text>
                        <Text style={styles.cell}>Transferred By</Text>
                        <Text style={styles.cell}>Transferred At</Text>
                        <Text style={styles.cell}>Amount</Text>
                        <Text style={styles.cell}>Status</Text>
                    </View>
                    {this.props.list.map((u, i) => 
                        <View key={i} style={styles.section}>
                            <Text style={styles.cell}>{u.order_number}</Text>
                            <Text style={styles.cell}>{u.sales_by.username}</Text>
                            <Text style={styles.cell}>{dateTime(u.created_at, 'date')}</Text>
                            <Text style={styles.cell}>RM {u.total_price}</Text>
                            <Text style={styles.cell}>{u.status}</Text>
                        </View>
                    )}
                </Page>
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