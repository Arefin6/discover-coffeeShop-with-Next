import React from 'react';
import styles from '../styles/banner.module.css';

const Banner = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}> <span className={styles.title1}>Coffee</span><span className={styles.title2}>Connoisseur</span></h1>
             <p className={styles.subTitle}>Discover Your Local Coffee Shops!</p>
             <button className={styles.button} onClick={props.handleOnClick}>{props.bannerButtonText}</button>
        </div>
    );
};

export default Banner;