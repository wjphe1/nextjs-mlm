import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsFillCaretDownFill, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

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
            <Tabs defaultActiveKey="inventory" id="uncontrolled-tab-example">
              <Tab eventKey="inventory" title="● Inventory">   
                <div className={styles.table}>
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
                      <tr>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">100</td>
                        <td><button onClick={() => this.editQuantity('100')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">80</td>
                        <td><button onClick={() => this.editQuantity('80')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold pl-4">Kopi Reeqza</td>
                        <td className="w-50">70</td>
                        <td><button onClick={() => this.editQuantity('70')} className={`${styles.tbtn} py-2`}>Edit Inventory</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="transfer" title="● Stock Transfer">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <div className="ml-auto btn-dropdown">
                      <DropdownButton
                        menuAlign="right"
                        title="Transfer Stock"
                      >
                        <Dropdown.Header>To Members</Dropdown.Header>
                        <Dropdown.Item eventKey="1">Fulfilment</Dropdown.Item>
                        <Dropdown.Item eventKey="2">No Fulfilment</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>To Non-members</Dropdown.Header>
                        <Dropdown.Item eventKey="3">Fulfilment</Dropdown.Item>
                        <Dropdown.Item eventKey="4">No Fulfilment</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Product Name</th>
                        <th>Inventory</th>
                        <th>E-Points</th>
                        <th>Role Based Pricing (MYR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Kopi Reezqa</td>
                        <td>100</td>
                        <td className="table-cell-collapse">
                          <Accordion>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                100 For MS <BsFillCaretDownFill/>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>20 For S<br/>10 For A</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </td>
                        <td className="table-cell-collapse">
                          <Accordion>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                100 For MS <BsFillCaretDownFill/>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>20 For S<br/>10 For A</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="pending" title="● Pending Fulfilment">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3 flex-wrap">
                    <form className={`py-2 ${styles.search_div}`}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <div className="d-flex align-items-center ml-auto flex-nowrap">
                      <div className="px-3 font-weight-bold">Action</div>
                      <button className={`ml-3 mr-2 ${styles.tbtn}`}>Ship Out</button>
                      <button className={`mr-3 ml-2 ${styles.tbtn_reverse}`}>Delivered</button>
                      <div className="table-cell-dropdown">
                        <Dropdown>
                          <Dropdown.Toggle>
                            <BsThreeDotsVertical/>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="/">Edit</Dropdown.Item>
                            <Dropdown.Item as="button">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4">Transfer ID</th>
                        <th>Member ID</th>
                        <th>Delivery Address</th>
                        <th>Transfer Summary</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight-bold pl-4">X1896747d</td>
                        <td className="font-weight-bold">Member1902</td>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>2, USJ height, Subang Jaya, Malaysia</td>
                        <td><button className={styles.modal_btn}>View</button></td>
                        <td><button className={styles.status_yellow} disabled>To Ship</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="past" title="● Past Transfer">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4">Transfer ID</th>
                        <th>Member ID</th>
                        <th>Delivery Address</th>
                        <th>Transfer Summary</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight-bold pl-4">X1896747d</td>
                        <td className="font-weight-bold">Member1902</td>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>2, USJ height, Subang Jaya, Malaysia</td>
                        <td><button className={styles.modal_btn}>View</button></td>
                        <td><button className={styles.status_green} disabled>Successfully Delivered</button></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold pl-4">X1896547e</td>
                        <td className="font-weight-bold">Member3714</td>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>B-17-01, Koi Kinrara, Jalan Pipit, Puchong, Malaysia</td>
                        <td><button className={styles.modal_btn}>View</button></td>
                        <td><button className={styles.status_red} disabled>Fulfilment Cancelled</button></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
            </Tabs>
          </div>
        </section>
    )
  }
}

export default HQprod;