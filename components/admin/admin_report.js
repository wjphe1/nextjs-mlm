import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

class Admrpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: (new Date()).setDate(new Date().getDate()+1)
    };
  }

  handleChange = (e) => {
    console.log(e)
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  render () {
    return (
        <section className="py-5 px-4">
          {/* Head Section */}
          <div className="d-flex align-items-center flex-wrap">
            <div className={utils.h_xl}>Report Overview</div>
            {/* Date Pickers */}
            <div className="ml-auto d-flex align-items-center flex-wrap">
              <div className="date-div mr-2">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">From</span>
                <DatePicker dateFormat="d MMM yyyy" className="start-date" calendarClassName="calendar-margin" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
              <div className="date-div">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">To</span>
                <DatePicker dateFormat="d MMM yyyy" className="end-date" calendarClassName="calendar-margin" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
            </div>
          </div>

          {/* Admin Reports Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey="sales" id="uncontrolled-tab-example">
              <Tab eventKey="sales" title="● Sales Report">
                <div className="d-flex flex-nowrap overflow-auto mt-3 pb-3 mb-4">
                  <button className={styles.huge_btn}>
                    <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="37" cy="17" r="17" fill="#FF6202"/>
                      <circle cx="67" cy="25" r="7" fill="#FFD9C2"/>
                      <circle cx="58" cy="6" r="4" fill="#D14F00"/>
                      <circle cx="54" cy="36" r="4" fill="#FFC5A2"/>
                      <circle cx="12" cy="17" r="4" fill="#FFD3AB"/>
                      <circle r="3" transform="matrix(-1 0 0 1 16 30)" fill="#EBBEA2"/>
                      <circle cx="4" cy="26" r="4" fill="#FFB82E"/>
                    </svg>
                    <div className="pt-2">Sales trends</div>
                  </button>
                  <button className={styles.huge_btn}>
                    <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="12" height="12" fill="#FFC5A1"/>
                      <rect y="15" width="12" height="12" fill="#D14F00"/>
                      <rect y="30" width="12" height="12" fill="#FFD3AB"/>
                      <rect x="14" width="12" height="12" fill="#FF6202"/>
                      <rect x="14" y="15" width="12" height="12" fill="#FF6202"/>
                      <rect x="14" y="30" width="12" height="12" fill="#FF6202"/>
                      <rect x="28" width="12" height="12" fill="#FFB82E"/>
                      <rect x="28" y="15" width="12" height="12" fill="#FF6202"/>
                      <rect x="28" y="30" width="12" height="12" fill="#FFD9C2"/>
                    </svg>
                    <div className="pt-2">Transactions History</div>
                  </button>
                  <button className={styles.huge_btn}>
                    <svg width="45" height="42" viewBox="0 0 45 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="18" height="42" fill="#FFD9C2"/>
                      <circle cx="28" cy="21" r="17" fill="#FF6202"/>
                    </svg>
                    <div className="pt-2">E-Points</div>
                  </button>
                  <button className={styles.huge_btn}>
                    <svg width="50" height="41" viewBox="0 0 50 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="13" r="9" fill="#FFD9C2"/>
                      <circle cx="42.5" cy="3.5" r="3.5" fill="#FFB82E"/>
                      <circle cx="24.5" cy="21.5" r="15.5" fill="#FF6202"/>
                      <path d="M28.6946 24.144C28.6946 24.6573 28.5592 25.1333 28.2886 25.572C28.0272 26.0013 27.6352 26.356 27.1126 26.636C26.5992 26.9067 25.9879 27.056 25.2786 27.084V28.218H24.3826V27.07C23.3932 26.986 22.5952 26.692 21.9886 26.188C21.3819 25.6747 21.0599 24.9793 21.0226 24.102H23.5706C23.6266 24.662 23.8972 25.0213 24.3826 25.18V22.968C23.6546 22.7813 23.0712 22.5993 22.6326 22.422C22.2032 22.2447 21.8252 21.96 21.4986 21.568C21.1719 21.176 21.0086 20.6393 21.0086 19.958C21.0086 19.1087 21.3212 18.4273 21.9466 17.914C22.5812 17.4007 23.3932 17.1113 24.3826 17.046V15.912H25.2786V17.046C26.2586 17.1207 27.0332 17.4053 27.6026 17.9C28.1719 18.3947 28.4892 19.0807 28.5546 19.958H25.9926C25.9366 19.454 25.6986 19.1273 25.2786 18.978V21.148C26.0532 21.3627 26.6506 21.554 27.0706 21.722C27.4906 21.89 27.8639 22.17 28.1906 22.562C28.5266 22.9447 28.6946 23.472 28.6946 24.144ZM23.5426 19.846C23.5426 20.0793 23.6126 20.2753 23.7526 20.434C23.9019 20.5927 24.1119 20.7327 24.3826 20.854V18.908C24.1212 18.9547 23.9159 19.0573 23.7666 19.216C23.6172 19.3653 23.5426 19.5753 23.5426 19.846ZM25.2786 25.222C25.5586 25.1753 25.7779 25.0633 25.9366 24.886C26.1046 24.7087 26.1886 24.4893 26.1886 24.228C26.1886 23.9853 26.1092 23.7893 25.9506 23.64C25.8012 23.4813 25.5772 23.346 25.2786 23.234V25.222Z" fill="white"/>
                      <circle cx="40.5" cy="31.5" r="9.25" stroke="#FF6202" strokeWidth="0.5"/>
                    </svg>
                    <div className="pt-2">E-Cash</div>
                  </button>
                </div>
                
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <div className={styles.thead}>Transaction History</div>
                    <button className={`ml-auto ${styles.tbtn}`}>Generate Invoice</button>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Transaction ID</th>
                        <th>Transacted At</th>
                        <th>Member ID</th>
                        <th>Amount (MYR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <td key={index}>Table cell {index}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <td key={index}>Table cell {index}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <td key={index}>Table cell {index}</td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="commission" title="● Commission Report">
              </Tab>
              <Tab eventKey="reimbursement" title="● Reimburstment">
              </Tab>
              <Tab eventKey="pnl" title="● P&L Statement">
              </Tab>
            </Tabs>
          </div>
        </section>
    )
  }
}

export default Admrpt;