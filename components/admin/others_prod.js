import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import Prodinv from './product_inventory'
import Stocktransfer from './stock_transfer'
import Pending from './pending_transfer'
import Past from './past_transfer'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

class Othprod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: (new Date()).setDate(new Date().getDate()+1)
    };
  }

  render () {
    var user = {};
    var role = null;
    var dtab = 'transfer';
    var userStr = Cookies.get('user');
    if (userStr) { user = JSON.parse(userStr); role = user.role; }
    if (role === 'HQ') { dtab = 'inventory'; }

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
            <Tabs defaultActiveKey={dtab} id="uncontrolled-tab-example">
              {role === 'HQ' && <Tab eventKey="inventory" title="● Inventory">    
                <Prodinv/>
              </Tab>}
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

export default Othprod;