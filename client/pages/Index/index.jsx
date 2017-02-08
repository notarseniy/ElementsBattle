import React, { Component } from 'react';
import { translate, Interpolate } from 'react-i18next';
import style from './style.css';
import pageStyle from '../style.css';
import playerUIstyle from '../../components/UI/Player/style.css';
import { Link, browserHistory } from 'react-router';

@translate(['index'], { wait: true })
class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleButtonClick(event) {
    browserHistory.push('/select');
  }

  render() {
    const { t } = this.props;

    return (
      <div className={pageStyle.page}>
        <h1 className={pageStyle.pageHeader}>
          <div className={pageStyle.smallHeader}>{t('index:pageHeader.smallHeader')}</div>
          <div className={pageStyle.bigHeader}>{t('index:pageHeader.bigHeader')}</div>
        </h1>
        <p className={pageStyle.text}><Interpolate i18nKey="index:text" useDangerouslySetInnerHTML={true} /></p>
        <button className={pageStyle.button} onClick={::this.handleButtonClick}>{t('index:singlePlayButton')}</button>
      </div>
    );
  }
}

export default Index;
