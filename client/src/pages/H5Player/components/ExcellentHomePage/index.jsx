import React, { Component } from 'react';
import { Button } from '@alifd/next';
import axios from 'axios';
import styles from './index.module.scss';
import ChimeePlayer from 'chimee-player';

export default class ExcellentHomePage extends Component {
  static displayName = 'ExcellentHomePage';

  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }

  // chimeeInit = (value) => {
  //   const wrapper = react.createElement('div');
  //   // reactDOM.render(<Hello />, wrapper)
  //   return (wrapper);
  // };

  componentDidMount (){
    const chimee = new ChimeePlayer({
      wrapper: "#wrapper",
      src: 'http://cdn.toxicjohann.com/lostStar.mp4',
      controls: false,
      autoplay: true
    });
  }

  render() {
    return (
      <div className={styles.excellentHomePage} style={{ height: '100vh' }}>
        <div className={styles.sty1}/>
        <div id="wrapper"></div>
        <div className={styles.excellentHomePageBackground} />
        <div className={styles.excellentHomePageContentWrapper}>
          <div className={styles.excellentHomePageContent}>
            <h2 className={styles.title}>新淘宝 新体验</h2>
            <p className={styles.subtitle}>
              新的开放能力赋能商家、ISV，使用手机淘宝帮助用户获得更出色的使用体验
            </p>
            <div
              className={styles.excellentHomePageButtons}
              style={{ textAlign: 'center', marginTop: 70 }}
            >
              <a href="/framework/">
                <Button
                  className={styles.sty2}
                  type="primary"
                  size="large"
                >
                  快速上手
                  <div className={styles.sty3}/>
                </Button>
              </a>
            </div>

            <div className={styles.sty4}>
              <div className={styles.gitContainer} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
