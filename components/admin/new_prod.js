import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import dynamic from 'next/dynamic'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import api from '../auth/api'
import routes from '../auth/routes'
import Spinner from 'react-bootstrap/Spinner'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

class Newprod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catelist: [],
            name: '',
            category: '',
            sku: '',
            image: '',
            imgData: '',
            desc: null,
            deli: null,
            order: null,
            ecashone: '',
            ecashtwo: '',
            ecashthree: '',
            pricems: '',
            prices: '',
            pricea: '',
            pricec: '',
            epoint: '',
            isloaded: true,
            error: false,
            err_msg: {},
        };
    }

    changeStr = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    changeNum = (e) => {
        var value = '';
        if(e.target.value || e.target.value === '0') { value = parseFloat(e.target.value) }
        this.setState({
          [e.target.name]: value
        });
    }

    descChange = (editorState) => {
        const changes = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
          desc: changes,
        });
    };

    deliChange = (editorState) => {
        const changes = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
          deli: changes,
        });
    };

    orderChange = (editorState) => {
        const changes = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
          order: changes,
        });
    };

    getCate = () => {
        api.get(routes.categories)
            .then(res => {
                const rows = res.data.categories
                console.log(rows)
                this.setState({ catelist: rows, category: rows[0].id })
            })
            .catch(err => {
                console.log('Get Category Error')
            })
    }

    imgChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = async () => {
            this.setState({
                image: file,
                imgData: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    submitProd = (e) => {
        e.preventDefault();
        let vm = this;
        vm.setState({ error: false, isloaded: false })
        const postdata = {
            product: {
                name: this.state.name,
                category_id: this.state.category,
                description: this.state.desc,
                delivery_description: this.state.deli,
                order_description: this.state.order,
                sku: this.state.sku,
                epoint: this.state.epoint,
                photo: this.state.imgData,
                product_prices_attributes: [
                    { role: 'MASTER_STOKIS', price: this.state.pricems },
                    { role: 'STOKIS', price: this.state.prices },
                    { role: 'AGENT', price: this.state.pricea },
                    { role: 'CONSUMER', price: this.state.pricec }
                ],
                product_ecash_rewards_attributes: [
                    { level: 0, ecash: this.state.ecashone },
                    { level: 1, ecash: this.state.ecashtwo },
                    { level: 2, ecash: this.state.ecashthree },
                ]
            }
        }
        api.post(routes.products, postdata)
        .then(res => {
            //console.log(res)
            Router.push({
                pathname: '/admin/products',
                query: { newprod: true },
            })
        })
        .catch(err => {
            //console.log(err.response.data)
            const msg = err.response.data;
            setTimeout(() => {vm.setState({ err_msg: msg, isloaded: true, error: true })}, 100)
        })
    }

    componentDidMount() {
        this.getCate();
    }

    render () {

        let $imagePreview = null;
        if (this.state.imgData) {
            $imagePreview = (<img src={this.state.imgData} className={form.img_preview}/>);
        } else {
            $imagePreview = null;
        }

        return (
        <section className="py-5 px-4">
            <form onSubmit={this.submitProd} className="row m-0">
                {this.state.isloaded ? <div className="col-lg-8 p-0 mb-4">
                    {this.state.error && <div className={`mb-4 ${form.notice_error}`}>
                        <div className="col-10 d-flex align-items-center">
                            <span className={form.nexcl}>!</span> 
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'string') && <div>{this.state.err_msg.error}</div>}
                            {(this.state.err_msg.error && typeof this.state.err_msg.error === 'array') && <ul className="m-0 pl-4">
                                {Object.keys(this.state.err_msg.error).map(key =>
                                    <li value={key} key={key}>{`${key}: ${this.state.err_msg.error[key][0]}`}</li>
                                )}
                            </ul>}
                        </div> 
                        <div onClick={() => this.setState({ error: false })} className={`col-2 ${form.nclose}`}>Close</div>
                    </div>}
                    <div className={`${styles.table} mb-2 pb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>Product Details</div>
                        </div>
                        <div className="row m-0 px-3 pt-4 pb-4">
                            <div className="col-md-6 px-2">
                                <label>Product Image</label>
                                <div className="d-flex align-items-center">
                                    {this.state.imgData ? $imagePreview :
                                    <label htmlFor="file-upload" className={form.field_file}>Upload your Photo here</label>}
                                    <input id="file-upload" name="prod_img" type="file" onChange={(e)=>this.imgChange(e)} className="d-none"/>
                                </div>
                            </div>
                            <div className="col-md-6 px-2 d-flex align-items-end">
                                {this.state.imgData && <button onClick={() => {this.setState({image: '', imgData: ''})}} className={form.remove_img_btn}><MdCancel/> Remove</button>}
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-4 px-2">
                                <label>Product Name</label>
                                <input name="name" onChange={this.changeStr} value={this.state.name} type="text" placeholder="E.g.: Kopi Reezqa" className={form.field_light} required/>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>Product Categories</label>
                                <select name="category" onChange={this.changeStr} value={this.state.category} type="text" className={form.field_light}>
                                    {this.state.catelist.map((u, i) => 
                                        <option key={i} value={u.id}>{u.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-4 px-2">
                                <label>SKUs</label>
                                <input name="sku" onChange={this.changeStr} value={this.state.sku} type="text" placeholder="E.g.: K124453" className={form.field_light}/>
                            </div>
                        </div>
                        <div className="px-4 py-2">Product Description</div>
                        <div className="admin-generic-tabs">
                            <Tabs defaultActiveKey="desc">
                                <Tab eventKey="desc" title="Deskripsi">
                                    <Editor onEditorStateChange={this.descChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                                <Tab eventKey="delivery" title="Penghantaran">
                                    <Editor onEditorStateChange={this.deliChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                                <Tab eventKey="order" title="Pesanan">
                                    <Editor onEditorStateChange={this.orderChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    <div className="row" style={{margin: '0 -5px'}}>
                    <div className="col-md-6 mb-2" style={{padding: '0 5px'}}>
                            <div className={`${styles.table} h-100`}>
                                <div className="d-flex align-items-center p-4 border-bottom">
                                    <div className={styles.thead}>Price Settings</div>
                                </div>
                                <div className="row m-0 py-3 flex-nowrap overflow-auto">
                                    <div className="pl-4 pr-0" style={{ minWidth: 170 }}>
                                        <div className="py-2">Role</div>
                                        <div className={`${styles.level} text-left`}>
                                            <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#FFCBAB"/>
                                                <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#FFCBAB"/>
                                            </svg>
                                            <span className="pl-2">Master Stokis</span>
                                        </div>
                                        <div className={`${styles.level} text-left`}>
                                            <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#DFF4FF"/>
                                                <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#DFF4FF"/>
                                            </svg>
                                            <span className="pl-2">Stokis</span>
                                        </div>
                                        <div className={`${styles.level} text-left`}>
                                            <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#BFFFC6"/>
                                                <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#BFFFC6"/>
                                            </svg>
                                            <span className="pl-2">Agents</span>
                                        </div>
                                        <div className={`${styles.level} text-left`}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.7053 6.25908C9.9614 6.972 9.05123 7.33333 8 7.33333C6.94901 7.33333 6.03884 6.97188 5.29483 6.2592C4.55107 5.5464 4.17391 4.67413 4.17391 3.66655C4.17391 2.6592 4.55107 1.78693 5.29483 1.07413C6.0386 0.361335 6.94864 0 8 0C9.05111 0 9.96128 0.361335 10.7052 1.07402C11.4491 1.78705 11.8261 2.65932 11.8261 3.66655C11.8261 4.67413 11.4489 5.54628 10.7053 6.25908Z" fill="#BFCDFF"/>
                                                <path d="M15.9612 12.1492C15.9353 11.8244 15.8829 11.4702 15.8058 11.0961C15.728 10.7192 15.6278 10.3629 15.5078 10.0372C15.3837 9.70067 15.2153 9.36828 15.0068 9.04975C14.7907 8.71914 14.5367 8.43126 14.2517 8.19437C13.9537 7.94654 13.5887 7.74729 13.1668 7.60195C12.7463 7.45737 12.2803 7.38413 11.7818 7.38413C11.586 7.38413 11.3967 7.45394 11.031 7.66082C10.806 7.78836 10.5428 7.93586 10.249 8.099C9.99777 8.23811 9.65744 8.36845 9.23708 8.48645C8.82697 8.60178 8.41056 8.66027 7.99941 8.66027C7.58857 8.66027 7.17216 8.60178 6.76175 8.48645C6.34183 8.36857 6.00135 8.23824 5.75057 8.09913C5.45955 7.93751 5.19619 7.79001 4.96779 7.66069C4.60245 7.45381 4.41312 7.384 4.21735 7.384C3.71871 7.384 3.25285 7.45737 2.83249 7.60207C2.41081 7.74716 2.04576 7.94641 1.74743 8.1945C1.46241 8.43152 1.20841 8.71927 0.992447 9.04975C0.784242 9.36828 0.615689 9.70054 0.491614 10.0374C0.371783 10.363 0.271558 10.7192 0.193719 11.0961C0.116466 11.4697 0.0642318 11.8241 0.0383342 12.1496C0.0128756 12.4678 0 12.7991 0 13.1338C0 14.0038 0.318233 14.7081 0.945772 15.2275C1.56556 15.7401 2.3855 16 3.38292 16H12.6171C13.6142 16 14.4341 15.7401 15.0541 15.2275C15.6818 14.7085 16 14.0039 16 13.1336C15.9999 12.7978 15.9868 12.4666 15.9612 12.1492Z" fill="#BFCDFF"/>
                                            </svg>
                                            <span className="pl-2">Customers</span>
                                        </div>
                                    </div>
                                    <div className="px-3">
                                        <div className="py-2 text-nowrap">Product Price</div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="pricems" onChange={this.changeNum} value={this.state.pricems} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="prices" onChange={this.changeNum} value={this.state.prices} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="pricea" onChange={this.changeNum} value={this.state.pricea} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="pricec" onChange={this.changeNum} value={this.state.pricec} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2" style={{padding: '0 5px'}}>
                            <div className={`${styles.table} h-100`}>
                                <div className="d-flex align-items-center p-4 border-bottom">
                                    <div className={styles.thead}>E-Cash (Product)</div>
                                </div>
                                <div className="row m-0 py-3 flex-nowrap">
                                    <div className="col-3 pl-4 pr-0">
                                        <div className="py-2">Level</div>
                                        <div className={styles.level}>1</div>
                                        <div className={styles.level}>2</div>
                                        <div className={styles.level}>3</div>
                                    </div>
                                    <div className="col-9 pr-4">
                                        <div className="py-2 text-nowrap">E-Cash Earned</div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="ecashone" onChange={this.changeNum} value={this.state.ecashone} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="ecashtwo" onChange={this.changeNum} value={this.state.ecashtwo} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                        <div className="row m-0 flex-nowrap">
                                            <div className={`${form.price_rm} col-4`}>RM</div>
                                            <div className="col-8 p-0"><input name="ecashthree" onChange={this.changeNum} value={this.state.ecashthree} className={form.field_price} type="number" placeholder="E.g. 15" required/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.table} mb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>E-Points</div>
                        </div>
                        <div className="p-4">
                            <input name="epoint" onChange={this.changeNum} value={this.state.epoint} type="text" placeholder="E.g. 100" className={form.field_light} required/>
                        </div>
                    </div>
                </div> : <div className="col-lg-8 d-flex justify-content-center p-5"><Spinner animation="border" size='lg'/></div>}
                <div className="col-lg-4 d-flex align-items-start">
                    <div className={`${styles.table} ${styles.submitdiv}`}>
                        {this.state.isloaded ? <input className={styles.tbtn} type="submit" value="Create Product"/> : <button className={styles.tbtn} disabled><Spinner animation="border" variant="light" size='sm'/></button>}
                        <Link href="/admin/products"><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
                    </div>
                </div>
            </form>
        </section>
        )
    }
}

export default Newprod;