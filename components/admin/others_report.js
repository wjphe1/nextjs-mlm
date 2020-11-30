import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import api from '../auth/api'
import routes from '../auth/routes'
import dateTime from '../dateTime'
import Spinner from 'react-bootstrap/Spinner'
import DatePicker from "react-datepicker";
import { FiCalendar } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

class Othrpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      show: false,
      risloaded: true,
      rerror: false,
      rerr_msg: {},
      rsuccess: false,
      error: false,
      isloaded: false,
      redeemlist: [],
      rewardlist: [],
      points: '',
    };
  }

  handleChange = (e) => {
    const value = parseInt(e.target.value);
    this.setState({
      [e.target.name]: value
    });
  }

  postPoints = () => {
    if (this.state.points) {
      this.setState({ risloaded: false, rerror: false, rsuccess: false })
      api.post(routes.epoint_requests, { epoint_request: { epoint: this.state.points }})
        .then(res => {
        console.log(res)
        this.setState({ risloaded: true, rsuccess: true })
      })
      .catch(err => {
        console.log(err.response)
        var msg = { error: err.response.status + ' : ' + err.response.statusText };
        if (err.response.data) { msg = err.response.data };
        this.setState({ rerror: true, risloaded: true, rerr_msg: msg })
      })
    } else {
      this.setState({ rerror: true, rerr_msg: { error: 'Please enter desired E-Points to Reimburse'}})
    }
  }

  getIncentives = () => {
    api.get(routes.epoint_rewards)
      .then(res => {
      const rows = res.data.epoint_rewards;
      console.log(rows)
      this.setState({ rewardlist: rows })
    })
    .catch(err => {
      console.log(err.response)
      this.setState({ error: true, isloaded: true })
    })
  }

  getPoints = () => {
    api.get(routes.epoint_requests)
      .then(res => {
      const rows = res.data.epoint_requests;
      console.log(rows)
      this.setState({ isloaded: true, redeemlist: rows })
    })
    .catch(err => {
      console.log(err.response)
      this.setState({ error: true, isloaded: true })
    })
  }

  componentDidMount() {
    this.getIncentives();
    this.getPoints();
  }

  render () {
    return (
      <>
        <div className="d-flex align-items-center flex-wrap">
          <div className={utils.h_xl}>My Report Overview</div>
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

        <div className="row" style={{ margin: '1.5rem -0.5rem'}}>
          <div className="col-md-4 px-2 mb-3">
            <div className={styles.huge_btn_others}>
              <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="37" cy="17" r="17" fill="#FF6202"/>
                <circle cx="67" cy="25" r="7" fill="#FFD9C2"/>
                <circle cx="58" cy="6" r="4" fill="#D14F00"/>
                <circle cx="54" cy="36" r="4" fill="#FFC5A2"/>
                <circle cx="12" cy="17" r="4" fill="#FFD3AB"/>
                <circle r="3" transform="matrix(-1 0 0 1 16 30)" fill="#EBBEA2"/>
                <circle cx="4" cy="26" r="4" fill="#FFB82E"/>
              </svg>
              <div className={`pt-2 ${utils.text_md}`}>Total Sales</div>
              <div className={`m-0 ${utils.h_lg}`}>RM 200</div>
            </div>
          </div>
          <div className="col-md-4 px-2 mb-3">
            <div className={styles.huge_btn_others}>
              <svg width="56" height="40" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.3518 12.5182C31.8802 13.944 30.0796 14.6667 28 14.6667C25.9209 14.6667 24.1203 13.9438 22.6485 12.5184C21.1771 11.0928 20.431 9.34826 20.431 7.3331C20.431 5.3184 21.1771 3.57386 22.6485 2.14827C24.1198 0.722671 25.9201 0 28 0C30.0794 0 31.8799 0.722671 33.3515 2.14804C34.8231 3.5741 35.569 5.31863 35.569 7.3331C35.569 9.34826 34.8229 11.0926 33.3518 12.5182Z" fill="#FF6202"/>
                <path d="M43.7494 24.2984C43.6982 23.6489 43.5945 22.9404 43.442 22.1922C43.288 21.4384 43.0897 20.7258 42.8524 20.0745C42.6069 19.4013 42.2738 18.7366 41.8613 18.0995C41.4338 17.4383 40.9313 16.8625 40.3675 16.3887C39.7779 15.8931 39.056 15.4946 38.2212 15.2039C37.3894 14.9147 36.4675 14.7683 35.4813 14.7683C35.0941 14.7683 34.7195 14.9079 33.9962 15.3216C33.551 15.5767 33.0303 15.8717 32.4491 16.198C31.9521 16.4762 31.2789 16.7369 30.4473 16.9729C29.636 17.2036 28.8122 17.3205 27.9988 17.3205C27.1861 17.3205 26.3623 17.2036 25.5504 16.9729C24.7197 16.7371 24.0462 16.4765 23.55 16.1983C22.9743 15.875 22.4533 15.58 22.0015 15.3214C21.2788 14.9076 20.9042 14.768 20.5169 14.768C19.5305 14.768 18.6089 14.9147 17.7773 15.2041C16.9431 15.4943 16.221 15.8928 15.6308 16.389C15.0669 16.863 14.5645 17.4385 14.1372 18.0995C13.7253 18.7366 13.3919 19.4011 13.1465 20.0748C12.9094 20.726 12.7111 21.4384 12.5571 22.1922C12.4043 22.9393 12.301 23.6481 12.2497 24.2991C12.1994 24.9357 12.1739 25.5982 12.1739 26.2675C12.1739 28.0075 12.8035 29.4162 14.0449 30.455C15.271 31.4802 16.8931 32 18.8662 32H37.1338C39.1064 32 40.7284 31.4802 41.9548 30.455C43.1965 29.4169 43.8261 28.0078 43.8261 26.2673C43.8258 25.5956 43.8 24.9331 43.7494 24.2984Z" fill="#FF6202"/>
                <path d="M47.1371 13.0156C45.8919 14.2377 44.3684 14.8571 42.6087 14.8571C40.8494 14.8571 39.3259 14.2375 38.0805 13.0158C36.8355 11.7938 36.2042 10.2985 36.2042 8.57123C36.2042 6.84434 36.8355 5.34903 38.0805 4.12709C39.3255 2.90515 40.8488 2.28571 42.6087 2.28571C44.3682 2.28571 45.8917 2.90515 47.1369 4.12689C48.3821 5.34923 49.0132 6.84454 49.0132 8.57123C49.0132 10.2985 48.3819 11.7936 47.1371 13.0156Z" fill="#FF6202"/>
                <path d="M55.9351 23.1129C55.8918 22.5562 55.8041 21.9489 55.675 21.3076C55.5447 20.6615 55.3769 20.0507 55.1761 19.4924C54.9684 18.9154 54.6865 18.3456 54.3375 17.7996C53.9758 17.2328 53.5506 16.7393 53.0735 16.3332C52.5746 15.9084 51.9638 15.5668 51.2574 15.3176C50.5535 15.0698 49.7735 14.9442 48.9391 14.9442C48.6114 14.9442 48.2944 15.0639 47.6824 15.4186C47.3057 15.6372 46.8651 15.89 46.3733 16.1697C45.9528 16.4082 45.3831 16.6316 44.6795 16.8339C43.993 17.0316 43.2959 17.1319 42.6077 17.1319C41.92 17.1319 41.223 17.0316 40.536 16.8339C39.8331 16.6318 39.2631 16.4084 38.8433 16.1699C38.3562 15.8929 37.9154 15.64 37.533 15.4183C36.9215 15.0637 36.6046 14.944 36.2769 14.944C35.4422 14.944 34.6624 15.0698 33.9587 15.3178C33.2529 15.5666 32.6418 15.9081 32.1424 16.3334C31.6653 16.7397 31.2402 17.233 30.8787 17.7996C30.5301 18.3456 30.248 18.9152 30.0403 19.4926C29.8397 20.0509 29.672 20.6615 29.5417 21.3076C29.4123 21.948 29.3249 22.5555 29.2816 23.1136C29.2389 23.6592 29.2174 24.227 29.2174 24.8007C29.2174 26.2922 29.7501 27.4996 30.8005 28.39C31.838 29.2687 33.2105 29.7143 34.8801 29.7143H50.3373C52.0064 29.7143 53.3789 29.2687 54.4166 28.39C55.4673 27.5002 56 26.2924 56 24.8005C55.9998 24.2248 55.978 23.657 55.9351 23.1129Z" fill="#FF6202"/>
                <path d="M17.9197 13.0156C16.6745 14.2377 15.151 14.8571 13.3913 14.8571C11.632 14.8571 10.1085 14.2375 8.86309 13.0158C7.61809 11.7938 6.98677 10.2985 6.98677 8.57123C6.98677 6.84434 7.61809 5.34903 8.86309 4.12709C10.1081 2.90515 11.6314 2.28571 13.3913 2.28571C15.1508 2.28571 16.6743 2.90515 17.9195 4.12689C19.1647 5.34923 19.7958 6.84454 19.7958 8.57123C19.7958 10.2985 19.1645 11.7936 17.9197 13.0156Z" fill="#FF6202"/>
                <path d="M26.7177 23.1129C26.6744 22.5562 26.5867 21.9489 26.4576 21.3076C26.3273 20.6615 26.1595 20.0507 25.9587 19.4924C25.751 18.9154 25.4691 18.3456 25.1201 17.7996C24.7584 17.2328 24.3332 16.7393 23.8561 16.3332C23.3572 15.9084 22.7464 15.5668 22.04 15.3176C21.3362 15.0698 20.5561 14.9442 19.7217 14.9442C19.394 14.9442 19.077 15.0639 18.465 15.4186C18.0883 15.6372 17.6477 15.89 17.1559 16.1697C16.7354 16.4082 16.1657 16.6316 15.4621 16.8339C14.7756 17.0316 14.0785 17.1319 13.3903 17.1319C12.7026 17.1319 12.0056 17.0316 11.3186 16.8339C10.6157 16.6318 10.0457 16.4084 9.62596 16.1699C9.13882 15.8929 8.69797 15.64 8.31565 15.4183C7.7041 15.0637 7.38717 14.944 7.05948 14.944C6.2248 14.944 5.44499 15.0698 4.74134 15.3178C4.03549 15.5666 3.42442 15.9081 2.92504 16.3334C2.44794 16.7397 2.02277 17.233 1.66127 17.7996C1.31275 18.3456 1.03061 18.9152 0.82292 19.4926C0.622333 20.0509 0.454565 20.6615 0.32427 21.3076C0.194954 21.948 0.107518 22.5555 0.0641682 23.1136C0.0215527 23.6592 0 24.227 0 24.8007C0 26.2922 0.532694 27.4996 1.58314 28.39C2.62061 29.2687 3.99312 29.7143 5.66272 29.7143H21.1199C22.789 29.7143 24.1615 29.2687 25.1992 28.39C26.2499 27.5002 26.7826 26.2924 26.7826 24.8005C26.7824 24.2248 26.7606 23.657 26.7177 23.1129Z" fill="#FF6202"/>
              </svg>
              <div className={`pt-2 ${utils.text_md}`}>Total Members Referred</div>
              <div className={`m-0 ${utils.h_lg}`}>10</div>
            </div>
          </div>
          <div className="col-md-4 px-2 mb-3">
            <div className={styles.huge_btn_others}>
              <svg width="50" height="40" viewBox="0 0 50 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="13" r="9" fill="#FFD9C2"/>
                <circle cx="42.5" cy="3.5" r="3.5" fill="#FFB82E"/>
                <circle cx="24.5" cy="21.5" r="15.5" fill="#FF6202"/>
                <path d="M28.6946 24.144C28.6946 24.6573 28.5592 25.1333 28.2886 25.572C28.0272 26.0013 27.6352 26.356 27.1126 26.636C26.5992 26.9067 25.9879 27.056 25.2786 27.084V28.218H24.3826V27.07C23.3932 26.986 22.5952 26.692 21.9886 26.188C21.3819 25.6747 21.0599 24.9793 21.0226 24.102H23.5706C23.6266 24.662 23.8972 25.0213 24.3826 25.18V22.968C23.6546 22.7813 23.0712 22.5993 22.6326 22.422C22.2032 22.2447 21.8252 21.96 21.4986 21.568C21.1719 21.176 21.0086 20.6393 21.0086 19.958C21.0086 19.1087 21.3212 18.4273 21.9466 17.914C22.5812 17.4007 23.3932 17.1113 24.3826 17.046V15.912H25.2786V17.046C26.2586 17.1207 27.0332 17.4053 27.6026 17.9C28.1719 18.3947 28.4892 19.0807 28.5546 19.958H25.9926C25.9366 19.454 25.6986 19.1273 25.2786 18.978V21.148C26.0532 21.3627 26.6506 21.554 27.0706 21.722C27.4906 21.89 27.8639 22.17 28.1906 22.562C28.5266 22.9447 28.6946 23.472 28.6946 24.144ZM23.5426 19.846C23.5426 20.0793 23.6126 20.2753 23.7526 20.434C23.9019 20.5927 24.1119 20.7327 24.3826 20.854V18.908C24.1212 18.9547 23.9159 19.0573 23.7666 19.216C23.6172 19.3653 23.5426 19.5753 23.5426 19.846ZM25.2786 25.222C25.5586 25.1753 25.7779 25.0633 25.9366 24.886C26.1046 24.7087 26.1886 24.4893 26.1886 24.228C26.1886 23.9853 26.1092 23.7893 25.9506 23.64C25.8012 23.4813 25.5772 23.346 25.2786 23.234V25.222Z" fill="white"/>
                <circle cx="40.5" cy="31.5" r="9.25" stroke="#FF6202" strokeWidth="0.5"/>
              </svg>
              <div className={`pt-2 ${utils.text_md}`}>E-Cash Earned</div>
              <div className={`m-0 ${utils.hightext_sm}`}>Filter date to view your E-Cash</div>
            </div>
          </div>
        </div>

        {/* Others Reports Tabs */}
        <div className={styles.table}>
          <div className="d-flex align-items-center pb-0 pt-3 pr-3 pl-5">
            <div className="d-flex">
              <svg width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18.4" height="42" fill="#FFD9C2"/>
                <ellipse cx="28.6219" cy="21" rx="17.3778" ry="17" fill="#FF6202"/>
              </svg>
              <div className="pl-3 align-self-center">
                <div className={utils.text_sm}>E-Points Earned</div>
                <div className={utils.h_md_n}>100 Pts</div>
              </div>
            </div>
            <button className={`ml-auto ${styles.tbtn}`} onClick={() => this.setState({ show: true })}>Redeem</button>
          </div>
          <div className="admin-generic-tabs report-tabs border-0 m-0">
            <Tabs defaultActiveKey="redeem" id="uncontrolled-tab-example">
              <Tab eventKey="redeem" title="Redemption History">
                {this.state.isloaded ? <Table responsive>
                  <thead>
                    <tr>
                      <th className="pl-5 pt-4">E-Points</th>
                      <th className="pt-4">Redeemed At</th>
                      <th className="pt-4">Approved At</th>
                      <th className="pt-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.redeemlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                      <td className="pl-5">{u.epoint} Pts</td>
                      <td>{dateTime(u.created_at)}</td>
                      <td>{u.approved_at ? dateTime(u.approved_at) : '-'}</td>
                      {u.status === 'PENDING' ? <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td> : 
                      <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                    </tr>)}
                </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.redeemlist.length && <div className="p-5 text-center">No Reimbursement History Found.</div>}
              </Tab>
              <Tab eventKey="incentive" title="Monthly Incentive">
                {this.state.isloaded ? <Table responsive>
                  <thead>
                    <tr>
                      <th className="pl-5 pt-4">Incentives</th>
                      <th className="pt-4">Awarded At</th>
                      <th className="pt-4">Reward Type</th>
                      <th className="pt-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rewardlist.map((u, i) => <tr className={styles.cell_center} key={i}>
                      <td className="pl-5">{u.epoint} Pts</td>
                      <td>{dateTime(u.created_at)}</td>
                      <td>{u.reward_type}</td>
                      {u.status === 'PENDING' ? <td><button className={`text-capitalize ${styles.status_yellow}`} disabled>{u.status.toLowerCase()}</button></td> : 
                      <td><button className={`text-capitalize ${styles.status_green}`} disabled>{u.status.toLowerCase()}</button></td>}
                    </tr>)}
                  </tbody>
                </Table> : <div className="p-5 d-flex justify-content-center"><Spinner animation="border" size='lg'/></div>}
                {this.state.isloaded && !this.state.rewardlist.length && <div className="p-5 text-center">No Incentive Record Found.</div>}
              </Tab>
            </Tabs>
          </div>
        </div>
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="md" aria-labelledby="fulfilment-modal" centered>
          <Modal.Header>
            <div className={utils.modal_header}>
              Points Redemption
            </div>
          </Modal.Header>
          <Modal.Body>
            {this.state.rerror && <div className={`w-100 mb-4 ${form.notice_error}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.nexcl}>!</span> 
                {(this.state.rerr_msg.error && typeof this.state.rerr_msg.error === 'string') && <div>{this.state.rerr_msg.error}</div>}
                {(this.state.rerr_msg.error && typeof this.state.rerr_msg.error === 'object') && <ul className="m-0 pl-4">
                  {Object.keys(this.state.rerr_msg.error).map(key =>
                    <li value={key} key={key}>{`${key}: ${this.state.rerr_msg.error[key][0]}`}</li>
                  )}
                </ul>}
              </div> 
              <div onClick={() => this.setState({ rerror: false })} className={`col-2 ${form.nclose}`}>Close</div>
            </div>}
            {this.state.rsuccess && <div className={`w-100 mb-4 ${form.notice_success}`}>
              <div className="col-10 d-flex align-items-center">
                <span className={form.sexcl}>✓</span> 
                <div><b>Success -</b> Request Sent</div>
              </div> 
              <div onClick={() => this.setState({ rsuccess: false })} className={`col-2 ${form.sclose}`}>Close</div>
            </div>}
            <label>Points to redeem</label>
            <input name="points" onChange={this.handleChange} type="number" className={form.field} />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.setState({ show: false, points: '' })} className={`pl-0 ${styles.tbtn_reverse_borderless}`}><MdCancel/> Discard</button>
            {this.state.risloaded ? <button onClick={this.postPoints} className={`px-5 ${styles.tbtn}`}>Submit</button> : <button className={`px-5 ${styles.tbtn}`} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default Othrpt;