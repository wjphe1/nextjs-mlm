import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import Stocktransfer from './stock_transfer'
import Pending from './pending_transfer'
import Past from './past_transfer'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

class HQprod extends React.Component {
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

  editQuantity = (value) => {
    var newt = prompt('Please enter a new inventory quantity', value)
    if (newt) {
      console.log(newt)
    }
  }

  render () {
    return (
        <section className="py-5 px-4">
          {/* Head Section */}
          <div className="d-flex align-items-center flex-wrap">
            <div className={utils.h_xl}>Product Management</div>
            {/* Date Pickers */}
            <div className="ml-auto d-flex align-items-center flex-wrap">
              <label className="date-div">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">From</span>
                <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </label>
              <label className="date-div">
                <span className="calendar-icon"><FiCalendar/></span>
                <span className="pl-2 pr-1">To</span>
                <DatePicker placeholderText="--/--/--" dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
              </label>
            </div>
          </div>

          {/* HQ Products Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey="inventory" id="uncontrolled-tab-example">
              <Tab eventKey="inventory" title="● Inventory">   
                <div className={`${styles.table} mb-4`}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search product here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4">Product Name</th>
                        <th className="w-50">Inventory</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.cell_center}>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">100</td>
                        <td><button onClick={() => this.editQuantity('100')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                      <tr className={styles.cell_center}>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">80</td>
                        <td><button onClick={() => this.editQuantity('80')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                      <tr className={styles.cell_center}>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">70</td>
                        <td><button onClick={() => this.editQuantity('70')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <div className={styles.thead}>History</div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4">Product Name</th>
                        <th>Inventory Changes</th>
                        <th>Changed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4 font-weight-bold">Kopi Reezqa</td>
                        <td>-100</td>
                        <td>11 Oct 2020</td>
                      </tr>
                      <tr>
                        <td className="pl-4 font-weight-bold">Kopi Reezqa</td>
                        <td>+50</td>
                        <td>10 Oct 2020</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="transfer" title="● Stock Transfer">
                <Stocktransfer/>
              </Tab>
              <Tab eventKey="pending" title="● Pending Fulfilment">
                <Pending/>
              </Tab>
              <Tab eventKey="past" title="● Past Transfer">
                <Past/>
              </Tab>
            </Tabs>
          </div>
        </section>
    )
  }
}

export default HQprod;