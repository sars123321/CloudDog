import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { uploadPic } from '../api';
import fetch from 'isomorphic-fetch'
import utils from '../lib/utils';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        var pics = e.target.files;
        const url = 'http://localhost:51459/api/data/upload';
        let formData = new FormData();
        for (var i = 0; i < pics.length; i++) {
            formData.append("file" + i, pics[i]);
        }

        const initObj = {
            method: 'POST',
            // credentials: 'include',
            //headers: new Headers({
            //    'Accept': 'application/json',
            //    'Content-Type': 'multipart/form-data'
            //}),
            body: formData,
            // mode: 'cors'
        }
        //uploadPic(formData);
        fetch(url, initObj)
            .then(response => response.json())
            //.then(response => decode(response))
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })
        // for (let x = 0; x < pics.length; x ++) {
        //   let formData = new FormData();
        //   formData.append("pic", pics[x]);
        //   uploadPic(formData);
        // }

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
