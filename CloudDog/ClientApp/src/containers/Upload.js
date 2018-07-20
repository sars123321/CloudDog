import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { uploadPic } from '../api';
import loading from '../asset/loading.svg';

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pending: false,
        backShowArr: [],
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.ajaxUpload = this.ajaxUpload.bind(this);
    }
    handleSubmit(e) {
      const pics = e.target.files;
      let formData = new FormData();
      for (let i = 0; i < pics.length; i++) {
        formData.append("file" + i, pics[i]);

        // 回显
        const freader = new FileReader();  
        freader.readAsDataURL(pics[i]);  
        freader.onload = (e) => {
          const { backShowArr } = this.state;
          this.setState({
            backShowArr: [...backShowArr, e.target.result]
          })
        };
      }
      this.ajaxUpload(formData);
    }
    async ajaxUpload(data) {
      this.setState({pending: true});
      const result = await uploadPic(data);
      if (result.code === 0) {
        alert('上传成功');
      } else {
        alert(result.message);
      }
      this.setState({pending: false});
    }
    render() {
      const { pending, backShowArr } = this.state;
        return (
          <div>
            <div style={{ position: 'relative', width: '80%', margin: 'auto' }}>
              <div>
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
              </div>
            </div>
            <div style={{margin: '.2rem'}}>
              {backShowArr.length !== 0 && backShowArr.map((item, i) => (
                <img style={{width: '1rem', marginRight: '.2rem', marginBottom: '.2rem'}} src={item} key={i} alt="云吸狗" />
              ))}
            </div>
            {pending && 
              <div style={{
                position: 'fixed', width: '100%', height: '100%', left: 0, top: 0,
                backgroundColor: 'rgba(0, 0, 0, .3)', textAlign: 'center'
              }}>
                <div style={{margin: '50% auto', padding: '.2rem', width: '1.5rem', backgroundColor: '#fff', borderRadius: '.1rem'}}>
                  <img style={{}} src={loading} alt="loading" />
                  <div style={{color: '#b4cdf1', fontSize: '.14rem'}}>正在上传中</div>
                </div>
              </div>
            }
          </div>
        )
    }
}

export default Upload;
