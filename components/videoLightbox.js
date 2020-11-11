import React from 'react'
import styles from '../styles/module/testimoni.module.scss'
import ModalVideo from 'react-modal-video'

const link = [{url: 'L61p2uyiMSo'}, {url: 'HBoFW83v5fg'}, {url:'L61p2uyiMSo'}, {url: 'HBoFW83v5fg'}, {url:'L61p2uyiMSo'}];

class Videolight extends React.Component {

  constructor () {
    super()
    this.state = {
      isOpen: false,
      id: null,
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal = (url) => {
    this.setState({
        isOpen: true,
        id: url,
    })
  }

  render () {
    return (
      <React.Fragment>
        <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.id} onClose={() => this.setState({isOpen: false})} />
        <div className={styles.vidtiles}>
            {link.map((u, i) =>
                <button onClick={() => this.openModal(u.url)} key={i} className={styles.vidbtn}>
                    <iframe className={styles.vidframe} src={"https://www.youtube.com/embed/"+u.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </button>
            )}
        </div>
      </React.Fragment>
    )
  }
}

export default Videolight;