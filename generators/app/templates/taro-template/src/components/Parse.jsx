import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import { wxParse } from '@/libs/wxParse/wxParse';
import '@/libs/wxParse/wxParse.wxss';

export default class Index extends Component {
  componentDidMount() {
    wxParse('plan', 'html', this.props.introduce, this.$scope);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(props) {
    wxParse('plan', 'html', props.introduce, this.$scope);
  }

  render() {
    return (
      <View>
        <import src="../libs/wxParse/wxParse.wxml" />
        <template is="wxParse" data="{{wxParseData: plan.nodes}}" />
      </View>
    );
  }
}

Index.defaultProps = {
  introduce: '',
};

Index.propTypes = {
  introduce: PropTypes.string,
};
