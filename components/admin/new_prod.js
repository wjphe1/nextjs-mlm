import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import dynamic from 'next/dynamic'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

class Newprod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imagePreviewUrl: '',
            desc: null,
            deli: null,
            order: null,
        };
    }

    handleChange = (e) => {
        console.log(e)
        const value = parseInt(e.target.value);
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

    imgChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            image: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }

    render () {

        let $imagePreview = null;
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} className={form.img_preview}/>);
        } else {
            $imagePreview = null;
        }

        return (
        <section className="py-5 px-4">
            <div className="row m-0">
                <div className="col-md-8 p-0">
                    <div className={`${styles.table} mb-4 pb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>Product Details</div>
                        </div>
                        <div className="row m-0 px-3 pt-4 pb-4">
                            <div className="col-md-6 px-2">
                                <label>Product Image</label>
                                <div className="d-flex align-items-center flex-column">
                                    {this.state.imagePreviewUrl ? $imagePreview :
                                    <label htmlFor="file-upload" className={form.field_file}>Upload your Photo here</label>}
                                    <input id="file-upload" name="prod_img" type="file" onChange={(e)=>this.imgChange(e)} className="d-none"/>
                                </div>
                            </div>
                            <div className="col-md-6 px-2 d-flex align-items-end">
                                {this.state.imagePreviewUrl && <button onClick={() => {this.setState({image: '', imagePreviewUrl: ''})}} className={form.remove_img_btn}><MdCancel/> Remove</button>}
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-6 px-2">
                                <label>Product Name</label>
                                <input type="text" placeholder="E.g.: Kopi Reezqa" className={form.field_light}/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Product Categories</label>
                                <select type="text" className={form.field_light}>
                                    <option>Skin Care</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-4 py-2">Product Description</div>
                        <div className="admin-new-prod-tabs">
                            <Tabs defaultActiveKey="desc">
                                <Tab eventKey="desc" title="Deskripsi">
                                    <Editor initialEditorState={this.state.desc} onEditorStateChange={this.descChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                                <Tab eventKey="delivery" title="Penghantaran">
                                    <Editor initialEditorState={this.state.deli} onEditorStateChange={this.deliChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                                <Tab eventKey="order" title="Pesanan">
                                    <Editor initialEditorState={this.state.order} onEditorStateChange={this.orderChange} placeholder="Write anything here..." editorClassName={styles.teditor} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    <div className={`${styles.table} mb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>Product Price Settings</div>
                        </div>
                        <div className="row m-0 py-3 overflow-auto flex-nowrap w-100">
                            <div className="col-4 pl-4 pr-0" style={{minWidth: 160}}>
                                <div className="py-2">Role</div>
                                <div className={styles.level}>
                                    <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#FFCBAB"/>
                                        <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#FFCBAB"/>
                                    </svg>
                                    <span className="pl-2">Master Stokis</span>
                                </div>
                                <div className={styles.level}>
                                    <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#DFF4FF"/>
                                        <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#DFF4FF"/>
                                    </svg>
                                    <span className="pl-2">Stokis</span>
                                </div>
                                <div className={styles.level}>
                                    <svg width="15" height="15" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0362 6.25908C9.33881 6.972 8.48553 7.33333 7.5 7.33333C6.5147 7.33333 5.66141 6.97188 4.96391 6.2592C4.26663 5.5464 3.91304 4.67413 3.91304 3.66655C3.91304 2.6592 4.26663 1.78693 4.96391 1.07413C5.66119 0.361335 6.51435 0 7.5 0C8.48542 0 9.3387 0.361335 10.0361 1.07402C10.7335 1.78705 11.087 2.65932 11.087 3.66655C11.087 4.67413 10.7334 5.54628 10.0362 6.25908Z" fill="#BFFFC6"/>
                                        <path d="M14.9637 12.1492C14.9394 11.8244 14.8903 11.4702 14.818 11.0961C14.745 10.7192 14.651 10.3629 14.5386 10.0372C14.4222 9.70067 14.2644 9.36828 14.0689 9.04975C13.8663 8.71914 13.6282 8.43126 13.361 8.19437C13.0816 7.94654 12.7395 7.74729 12.3439 7.60195C11.9496 7.45737 11.5127 7.38413 11.0454 7.38413C10.8619 7.38413 10.6844 7.45394 10.3416 7.66082C10.1306 7.78836 9.88386 7.93586 9.60843 8.099C9.37291 8.23811 9.05385 8.36845 8.65977 8.48645C8.27528 8.60178 7.8849 8.66027 7.49945 8.66027C7.11428 8.66027 6.7239 8.60178 6.33914 8.48645C5.94546 8.36857 5.62627 8.23824 5.39116 8.09913C5.11833 7.93751 4.87143 7.79001 4.65731 7.66069C4.31479 7.45381 4.1373 7.384 3.95376 7.384C3.48629 7.384 3.04955 7.45737 2.65546 7.60207C2.26014 7.74716 1.9179 7.94641 1.63821 8.1945C1.37101 8.43152 1.13288 8.71927 0.930419 9.04975C0.735227 9.36828 0.577208 9.70054 0.460889 10.0374C0.348547 10.363 0.254586 10.7192 0.181612 11.0961C0.109187 11.4697 0.0602173 11.8241 0.0359383 12.1496C0.0120709 12.4678 0 12.7991 0 13.1338C0 14.0038 0.298343 14.7081 0.886662 15.2275C1.46771 15.7401 2.23641 16 3.17149 16H11.8285C12.7633 16 13.532 15.7401 14.1132 15.2275C14.7017 14.7085 15 14.0039 15 13.1336C14.9999 12.7978 14.9877 12.4666 14.9637 12.1492Z" fill="#BFFFC6"/>
                                    </svg>
                                    <span className="pl-2">Agents</span>
                                </div>
                            </div>
                            <div className="col-4" style={{minWidth: 160}}>
                                <div className="py-2">Product Price</div>
                                <div className="row m-0">
                                    <div className={`${form.price_rm} col-4`}>RM</div>
                                    <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                                </div>
                                <div className="row m-0">
                                    <div className={`${form.price_rm} col-4`}>RM</div>
                                    <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                                </div>
                                <div className="row m-0">
                                    <div className={`${form.price_rm} col-4`}>RM</div>
                                    <div className="col-8 p-0"><input className={form.field_price} type="number" placeholder="E.g. 15"/></div>
                                </div>
                            </div>
                            <div className="col-4 pr-4 pl-0" style={{minWidth: 160}}>
                                <div className="py-2">E-Points</div>
                                <input type="number" className={form.field_light}/>
                                <input type="number" className={form.field_light}/>
                                <input type="number" className={form.field_light}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-start">
                    <div className={`d-flex flex-column align-items-center p-4 ${styles.table}`}>
                        <button className={styles.tbtn}>Create Product</button>
                        <Link href="/admin/products"><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default Newprod;