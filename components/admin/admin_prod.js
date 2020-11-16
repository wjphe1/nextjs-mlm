import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { BsFillCaretDownFill, BsThreeDots } from 'react-icons/bs';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'

class Admprod extends React.Component {
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

  componentDidMount() {
    //console.log(this.props.router)
  }

  render () {
    const dtab = this.props.router.query.tab || 'list';

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

          {/* Admin Products Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey={dtab} id="uncontrolled-tab-example">
              <Tab eventKey="list" title="● Product List">   
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search product here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <Link to href="/admin/new/product"><a className={`ml-auto ${styles.tbtn}`}>New Product</a></Link>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Product Name</th>
                        <th>Created At</th>
                        <th>E-Points (Pts)</th>
                        <th>Pricing (MYR)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Kopi Reeqza</td>
                        <td>20 Oct 2020 11.30 AM</td>
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
                                300 For MS <BsFillCaretDownFill/>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>250 For S<br/>150 For A</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </td>
                        <td className="table-cell-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle>
                              <BsThreeDots/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/">Edit</Dropdown.Item>
                              <Dropdown.Item as="button">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Kopi Reeqza</td>
                        <td>20 Oct 2020 11.30 AM</td>
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
                                300 For MS <BsFillCaretDownFill/>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>250 For S<br/>150 For A</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </td>
                        <td className="table-cell-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle>
                              <BsThreeDots/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/">Edit</Dropdown.Item>
                              <Dropdown.Item as="button">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="category" title="● Product Category">
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <Link to href="/admin/new/category"><a className={`ml-auto ${styles.tbtn}`}>New Category</a></Link>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Category</th>
                        <th className="w-50">Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">Skin Care Beauty</td>
                        <td className="w-50">20 Oct 2020 11.30 AM</td>
                        <td className="table-cell-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle>
                              <BsThreeDots/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="/">Edit</Dropdown.Item>
                              <Dropdown.Item as="button">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
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

export default withRouter(Admprod);