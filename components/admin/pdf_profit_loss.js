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
                {this.props.list.map((u, i) => <Page size="A4" key={i} style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.cell}>Revenue</Text>
                        <Text style={styles.cell}>Expenses</Text>
                        <Text style={styles.cell}>Expenses Name</Text>
                        <Text style={styles.cell}>Remark</Text>
                        <Text style={styles.cell}>Date</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.cell}>RM {u.revenue}</Text>
                    </View>
                    {u.expenses.map((v, j) => 
                        <View key={j} style={styles.section}>
                            <Text style={styles.cell}></Text>
                            <Text style={styles.cell}>RM {v.price}</Text>
                            <Text style={styles.cell}>{v.name}</Text>
                            <Text style={styles.cell}>{v.remark}</Text>
                            <Text style={styles.cell}>{dateTime(v.date, 'date')}</Text>
                        </View>
                    )}
                </Page>)}
            </Document>

            return (<>
                {this.props.list.length ? <div className="ml-2 py-2">
                    <PDFDownloadLink document={MyDoc} fileName="Profit_Loss_Statement.pdf" className={astyl.tbtn_reverse}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                    </PDFDownloadLink>
                </div> :
                <div className="ml-2 py-2" style={{ opacity: 0.5, pointerEvents: 'none' }}>
                    <PDFDownloadLink document={MyDoc} fileName="Profit_Loss_Statement.pdf" className={astyl.tbtn_reverse}>
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