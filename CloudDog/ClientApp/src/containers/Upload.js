import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { uploadPic } from '../api';
import utils from '../lib/utils';

class Upload extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      const pics = e.target.files;
      let formData = new FormData();
      for (let i = 0; i < pics.length; i++) {
        formData.append("file" + i, pics[i]);
      }
      this.ajaxUpload(formData);
    }
    async ajaxUpload(data) {
      const result = await uploadPic(data);
      if (result.code === 0) {
        console.log(result.message);
      } else {
        alert(result.message);
      }
    }
    render() {
        return (
            <div style={{ position: 'relative', width: '80%', margin: 'auto' }}>
                <form name="form1">
                    <Button
                        block={true}
                        bsSize="large"
                        bsStyle="info"
                        style={{ marginTop: '1rem' }}
                    >上传文件</Button>
                    <input
                        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '44px', opacity: 0 }}
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        onChange={this.handleSubmit}
                    />
                </form>
            </div>
        )
    }
}

export default Upload;
