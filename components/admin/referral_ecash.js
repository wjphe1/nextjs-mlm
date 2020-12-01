import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'

class Referral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {
        return (
            <div className={`d-flex flex-column ${styles.table}`}>
                <div className={`${form.notice_warning} mx-5 mt-4`}><span>For Product E-cash Settings, please go to <Link href="/admin/products"><a style={{fontWeight: 'bold', color: '#FF6202', whiteSpace: 'nowrap'}}>product tab</a></Link> and set the new e-cash earned value for each product.</span></div>
                <div className="row m-0 py-3 px-5 flex-nowrap" style={{ maxWidth: 600 }}>
                    <div className="col-3 pl-4 pr-0">
                        <div className="py-2">Level</div>
                        <div className={styles.level}>1</div>
                        <div className={styles.level}>2</div>
                        <div className={styles.level}>3</div>
                        <div className={styles.level}>4</div>
                    </div>
                    <div className="col-9 pr-4">
                        <div className="py-2 text-nowrap">E-Cash Earned</div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                        </div>
                        <div className="row m-0 flex-nowrap">
                            <div className={`${form.price_rm} col-4`}>RM</div>
                            <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Referral;