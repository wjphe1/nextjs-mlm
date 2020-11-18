import Link from 'next/link'
import React from 'react'
import styles from '../../styles/module/admin/admin.module.scss'
import form from '../../styles/module/form.module.scss'
import { MdCancel } from 'react-icons/md'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

class Newmemb extends React.Component {
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
                            <div className={styles.thead}>New Member Details</div>
                        </div>
                        <div className="row m-0 px-3 pt-4 pb-4">
                            <div className="col-md-6 px-2">
                                <label>Profile Photo</label>
                                <div className="d-flex align-items-center">
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
                                <label>Member Name</label>
                                <input type="text" className={form.field_light}/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Membership Level</label>
                                <select type="text" className={form.field_light}>
                                    <option>Master Stokis</option>
                                    <option>Stokis</option>
                                    <option>Agent</option>
                                </select>
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-6 px-2">
                                <label>IC Number</label>
                                <input type="text" className={form.field_light}/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Passwords</label>
                                <input type="password" className={form.field_light}/>
                            </div>
                        </div>
                        <div className="row m-0 px-3">
                            <div className="col-md-6 px-2">
                                <label>Email Address (Optional)</label>
                                <input type="email" className={form.field_light}/>
                            </div>
                            <div className="col-md-6 px-2">
                                <label>Referral Member ID</label>
                                <input type="text" className={form.field_light} placeholder="E.g. Member5758"/>
                            </div>
                        </div>
                        <div className="px-4 pb-2">Address</div>
                        <div className="px-4">
                            <textarea rows="4" className={form.field_light}></textarea>
                        </div>
                    </div>
                    <div className={`${styles.table} mb-4`}>
                        <div className="d-flex align-items-center p-4 border-bottom">
                            <div className={styles.thead}>Bank Account Details</div>
                        </div>
                        <div className="row m-0 px-3 py-4">
                            <div className="col-md-4 px-2">
                                <label>Bank Name</label>
                                <select type="text" className={`font-weight-bold ${form.field_light}`}>
                                    <option>Maybank</option>
                                    <option>Public Bank</option>
                                    <option>AmBank</option>
                                    <option>BSN</option>
                                    <option>Bank Rakyat</option>
                                    <option>Bank Muamalat</option>
                                    <option>OCBC Bank</option>
                                    <option>HSBC Bank</option>
                                </select>
                            </div>
                            <div className="col-md-8 px-2">
                                <label>Account Number</label>
                                <input type="number" className={form.field_light}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-start">
                    <div className={`d-flex flex-column align-items-center p-4 ${styles.table}`}>
                        <button className={styles.tbtn}>Create Member</button>
                        <Link href="/admin/products"><a className="pt-3" style={{color: "#FF6202"}}><MdCancel/> Discard</a></Link>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default Newmemb;