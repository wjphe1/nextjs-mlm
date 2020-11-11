import React from "react";
import styles from '../styles/module/testimoni.module.scss'
// Import Simple React Lightbox
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox";

class Imglight extends React.Component {

    render () {
        return (
            <div className={styles.imgtiles}>
                <SimpleReactLightbox>
                    <SRLWrapper>
                        <img src="images/sample.png" alt="Caption" />
                        <img src="images/sample-2.png" alt="Another Caption" />
                        <img src="images/sample.png" alt="Caption" />
                        <img src="images/sample-2.png" alt="Another Caption" />
                        <img src="images/sample.png" alt="Caption" />
                        <img src="images/sample-2.png" alt="Another Caption" />
                        <img src="images/sample.png" alt="Caption" />
                        <img src="images/sample-2.png" alt="Another Caption" />
                    </SRLWrapper>
                </SimpleReactLightbox>
            </div>
        );
    }
}

export default Imglight;