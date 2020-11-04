import { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';

export default class Index extends Component {
  config = {
    usingComponents: {
      parser: '../libs/richText/parser',
    },
  };

  render() {
    return (
      <View>
        <parser lazyLoad="true" html={this.props.html} />
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
