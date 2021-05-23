import { API } from "../config";
import React, {Component} from 'react';

 class Image extends Component {  
  render() {
    let {mode, src, height, width, style, ...props} = this.props;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 300,
      width: width || 300,
      backgroundColor: 'white'
    };

    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

    return <div {...props} style={{...defaults, ...style, ...important}} />
  }
}
const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <Image
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            // style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default ShowImage;
