import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import utils from '../../styles/module/utils.module.scss'
import form from '../../styles/module/form.module.scss'
import { FiCalendar } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import DatePicker from "react-datepicker"
import Modal from 'react-bootstrap/Modal'
import cn from 'classnames'

class Pnlform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            startDate: new Date(),
            endDate: (new Date()).setDate(new Date().getDate()+30),
            expenses: [{
                name: '',
                date: new Date(),
                amount: '',
                remarks: '',
            }],
            revenue: '',
        };
    }

    handleChange = (e) => {
        const value = parseInt(e.target.value);
        this.setState({
            [e.target.name]: value
        });
    }

    appendForm = (e) => {
        var current = this.state.expenses;
        var newform = {name: '', date: new Date(), amount: '', remarks: ''};
        var newcurrent = current.concat(newform);
        this.setState({
            expenses: newcurrent
        })
    }

    sliceForm = (i) => {
        if (confirm('Remove expenses?')) {
            var current = this.state.expenses;
            current.splice(i, 1)
            this.setState({
                expenses: current
            })
        }
    }

    changeExpenses = (i, name, e) => {
        var current = this.state.expenses;
        if (name === 'date') { current[i][name] = e; }
        else if (name === 'amount') { current[i][name] = parseFloat(e.target.value); }
        else { current[i][name] = e.target.value; }
        this.setState({
            expenses: current
        })
        console.log(current)
    }

    isOdd(num) { 
        return num % 2;
    }

    render () {
    
        return (
            <>
                <button className={`m-2 py-2 ${styles.tbtn}`} onClick={() => this.setState({ show: true })}>Generate Statement</button>
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} size="md" contentClassName="pnl-form-modal" aria-labelledby="pnl-form-modal" centered>
                    <Modal.Header>
                        <div className={utils.modal_header_full}>P&amp;L Forms</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-4 border-bottom">
                            <div className="font-weight-bold">Revenue</div>
                            <div className="py-3 row" style={{ margin: '0 -0.5rem' }}>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>From Date</div>
                                    <div className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker dateFormat="d MMM yyyy" className="start-date" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </div>
                                </div>
                                <div className="col-6 p-0">
                                    <div className={`pl-2 ${utils.text_md}`}>To Date</div>
                                    <div className="date-div">
                                        <span className="calendar-icon mr-2"><FiCalendar/></span>
                                        <DatePicker dateFormat="d MMM yyyy" className="end-date" selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} minDate={this.state.startDate} showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative">
                                <div className="position-absolute font-weight-bold" style={{ top: 14, left: 14, fontSize: '0.9rem' }}>RM</div>
                                <input type="number" className={`pl-5 m-0 ${form.field_light}`} value={this.state.revenue} onChange={this.handleChange} name="revenue" />
                            </div>
                        </div>
                        
                        {this.state.expenses.map((u, i) => 
                            <div className={`${cn({['grey-bg']: this.isOdd(i)})} p-4 border-bottom`} key={i} >
                                <div className="d-flex align-items-center">
                                    <div className="font-weight-bold">Expenses {i+1}</div>
                                    <button className={`ml-auto ${styles.modal_btn}`} onClick={(i) => this.sliceForm(i)}>Remove</button>
                                </div>
                                <div className="pt-3 m-0 row">
                                    <div className="col-6 pr-2 pl-0">
                                        <label>Expenses Name</label>
                                        <input className={form.field_light} onChange={(e) => this.changeExpenses(i, 'name', e)} value={u.name}/>
                                    </div>
                                    <div className="col-6 pl-2 pr-0 field-datepicker">
                                        <label>Expenses Date</label>
                                        <DatePicker dateFormat="d MMM yyyy" className={form.field_light} selected={u.date} onChange={(date) => this.changeExpenses(i, 'date', date)} maxDate={this.state.endDate} minDate={this.state.startDate} />
                                    </div>
                                </div>
                                <div className="m-0 row">
                                    <div className="col-6 pr-2 pl-0">
                                        <label>Expenses Amount</label>
                                        <div className="position-relative">
                                            <div className="position-absolute font-weight-bold" style={{ top: 14, left: 14, fontSize: '0.9rem' }}>RM</div>
                                            <input type="number" className={`pl-5 m-0 ${form.field_light}`} value={u.amount} onChange={(e) => this.changeExpenses(i, 'amount', e)} />
                                        </div>
                                    </div>
                                    <div className="col-6 pl-2 pr-0">
                                        <label>Remarks</label>
                                        <input className={`m-0 ${form.field_light}`} onChange={(e) => this.changeExpenses(i, 'remarks', e)} value={u.remarks} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className={`py-3 px-4 ${styles.modal_btn}`} onClick={this.appendForm}>+ Add Another Expenses</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={styles.tbtn_reverse_borderless} onClick={() => this.setState({ show: false })}><MdCancel/> Discard</button>
                        <button className={`px-5 ${styles.tbtn}`}>Generate</button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Pnlform;