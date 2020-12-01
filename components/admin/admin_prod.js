import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import dateTime from '../dateTime'
import api from '../auth/api'
import routes from '../auth/routes'
import DatePicker from "react-datepicker"
import { FiCalendar } from 'react-icons/fi'
import { HiOutlineSearch } from 'react-icons/hi'
import { BsFillCaretDownFill, BsThreeDots } from 'react-icons/bs'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'

class Admprod extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      prodlist: [],
      catelist: [],
      isloaded: false,
      error: false,
      cisloaded: false,
      cerror: false,
      toast: true,
      ppage: 1,
      pnext: false,
      cpage: 1,
      cnext: false,
    };
  }

  handleChange = (e) => {
    console.log(e)
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  getProd = (str) => {
    this.setState({ isloaded: false })
    const pagy = this.state.ppage + parseInt(str || 0);
    api.get(routes.products + '?page=' + pagy)
      .then(res => {
        const rows = res.data.products
        if (rows.length >= 20) { this.setState({ pnext: true, ppage: pagy }) }
        else { this.setState({ pnext: false, ppage: pagy }) }
        console.log(rows)
        this.setState({ prodlist: rows, isloaded: true })
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ isloaded: true, error: true })
      })
  }

  getCate = (str) => {
    this.setState({ cisloaded: false })
    const pagy = this.state.cpage + parseInt(str || 0);
    api.get(routes.categories + '?page=' + pagy)
      .then(res => {
        const rows = res.data.categories
        if (rows.length >= 20) { this.setState({ cnext: true, cpage: pagy }) }
        else { this.setState({ cnext: false, cpage: pagy }) }
        console.log(rows)
        this.setState({ cisloaded: true, catelist: rows })
      })
      .catch(err => {
        console.log(err.response)
        this.setState({ cisloaded: true, cerror: true })
      })
  }

  deleteProd = (id) => {
    this.setState({ isloaded: false });
    api.delete(routes.products + '/' + id)
    .then(res => {
      console.log('delete successfully')
      this.getProd();
    })
    .catch(err => {
      console.log(err.response)
      this.setState({ toast: true, error: true, isloaded: true })
    })
  }

  deleteCate = (id) => {
    this.setState({ cisloaded: false });
    api.delete(routes.categories + '/' + id)
    .then(res => {
      console.log('delete successfully')
      this.getCate();
    })
    .catch(err => {
      console.log(err.response)
      this.setState({ toast: true, cerror: true, cisloaded: true })
    })
  }

  componentDidMount() {
    this.getCate();
    this.getProd();
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

          {/* Admin Products Tabs */}
          <div className="admin-reports-tabs">
            <Tabs defaultActiveKey={dtab} id="uncontrolled-tab-example">
              <Tab eventKey="list" title="● Product List">
                {(this.state.error && this.state.toast) && <div className={`mb-4 ${form.notice_error}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span>
                    <span><b>Error -</b> Delete Product Unsuccessful</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.nclose}`}>Close</div>
                </div>}
                {(this.props.router.query.newprod && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span>
                    <span><b>Congratulations -</b> Product was created successfully</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                {(this.props.router.query.editprod && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span>
                    <span><b>Congratulations -</b> Product was updated successfully</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search product here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <Link to href="/admin/products/new"><a className={`ml-auto ${styles.tbtn}`}>New Product</a></Link>
                  </div>
                  {this.state.isloaded ? <Table responsive>
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
                      {this.state.prodlist.map((u, i) => <tr key={i}>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">{u.name}</td>
                        <td>{dateTime(u.created_at)}</td>
                        <td className="table-cell-collapse">{u.epoint}</td>
                        <td className="table-cell-collapse">
                          {u.product_prices.length && <Accordion>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                {u.product_prices[0].price} For MS <BsFillCaretDownFill/>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  {u.product_prices[1].price} For S<br/>
                                  {u.product_prices[2].price} For A<br/>
                                  {u.product_prices[3].price} For C<br/>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>}
                        </td>
                        <td className="table-cell-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle>
                              <BsThreeDots/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href={'/admin/products/'+ u.id}>Edit</Dropdown.Item>
                              <Dropdown.Item as="button" onClick={() => this.deleteProd(u.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                  {this.state.isloaded && !this.state.prodlist.length && <div className="p-5 text-center">No product found. Click new product to add.</div>}
                </div>
                {(this.state.pnext || this.state.ppage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                  {this.state.ppage > 1 && <button onClick={() => this.getProd(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.ppage} Showing {(this.state.ppage - 1)*20 + 1} - {(this.state.ppage - 1)*20 + this.state.prodlist.length}</div>
                  {this.state.pnext && <button onClick={() => this.getProd(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}
              </Tab>
              <Tab eventKey="category" title="● Product Category">
                {(this.state.cerror && this.state.toast) && <div className={`mb-4 ${form.notice_error}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.nexcl}>!</span>
                    <span><b>Error -</b> Delete Category Unsuccessful</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.nclose}`}>Close</div>
                </div>}
                {(this.props.router.query.newcate && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span>
                    <span><b>Congratulations -</b> Category was created successfully</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                {(this.props.router.query.editcate && this.state.toast) && <div className={`mb-4 ${form.notice_success}`}>
                  <div className="col-10 d-flex align-items-center">
                    <span className={form.sexcl}>✓</span>
                    <span><b>Congratulations -</b> Category was updated successfully</span>
                  </div>
                  <div onClick={() => this.setState({ toast: false })} className={`col-2 ${form.sclose}`}>Close</div>
                </div>}
                <div className={styles.table}>
                  <div className="d-flex align-items-center p-3">
                    <form className={styles.search_div}>
                      <input type="text" placeholder="Search category here" className={styles.search}/>
                      <button type="submit" className={styles.submit} value="Submit"><HiOutlineSearch/></button>
                    </form>
                    <Link to href="/admin/categories/new"><a className={`ml-auto ${styles.tbtn}`}>New Category</a></Link>
                  </div>
                  {this.state.cisloaded ? <Table responsive>
                    <thead>
                      <tr>
                        <th className="pl-4"><input type="checkbox"/></th>
                        <th>Category</th>
                        <th className="w-50">Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.catelist.map((u, i) => <tr key={i}>
                        <td className="pl-4"><input type="checkbox"/></td>
                        <td className="font-weight-bold">{u.name}</td>
                        <td className="w-50">{dateTime(u.created_at)}</td>
                        <td className="table-cell-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle>
                              <BsThreeDots/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href={'/admin/categories/'+ u.id}>Edit</Dropdown.Item>
                              <Dropdown.Item as="button" onClick={() => this.deleteCate(u.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>)}
                    </tbody>
                  </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                  {this.state.cisloaded && !this.state.catelist.length && <div className="p-5 text-center">No category found. Click new category to add.</div>}
                </div>
                {(this.state.cnext || this.state.cpage > 1) && <div className="d-flex align-items-center justify-content-between pt-4">
                  {this.state.cpage > 1 && <button onClick={() => this.getCate(-1)} className={styles.tbtn}>Prev</button>}
                  <div>Page {this.state.cpage} Showing {(this.state.cpage - 1)*20 + 1} - {(this.state.cpage - 1)*20 + this.state.catelist.length}</div>
                  {this.state.cnext && <button onClick={() => this.getCate(1)} className={`ml-auto ${styles.tbtn}`}>Next</button>}
                </div>}
              </Tab>
            </Tabs>
          </div>
        </section>
    )
  }
}

export default withRouter(Admprod);