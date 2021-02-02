import React, { useState, useModal } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


const mb = {
    width: '500px',
    margin: 'auto'
};
const button = {
    margin: 'auto',
    marginTop: "15px"
};
const table = {
    width: "900px",
    margin: "auto",
    position: "relative",
    top: "100px"
};
const img = {
    maxWidth: "70px",
    display: "block",
    margin: "0 auto"
}

const Check = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [checkData, setData] = useState(users);
    const [picture, setPicture] = useState(null);
    const [open, setOpen] = useState(false);
    const [imgData, setImgData] = useState(null);
    const [lightMode, setLightMode] = React.useState(false)

    const onSubmit = dataCheck => addCheck(dataCheck);

    const addCheck = async (e) => {
        const Data = new FormData();
        Data.append('image', e.image[0]);
        const dataCheck = await axios.post('https://facedemo-api.dev.trandata.io/api/v1/facedemo/recognition', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        const res = dataCheck.data;
        if (res.ErrorCode === 0) {

            const data = res.Data;
            if (data.faces.length > 0) {
                setData(data.faces);
                console.log(data);
                drawImage(data.faces[0].box[0], data.faces[0].box[1], data.faces[0].box[2], data.faces[0].box[3]);
            } else {
                setData([]);
                Swal.fire(
                    'Not found!',
                    '',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'The image is not correct!',
                '',
                'error'
            )
        }
    }

    //upload file ảnh
    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // ve anh truoc khi submit
    const handleImageLoad = (event) => {
        const { target } = event;
        let counter = 0;
        //khi submit sẽ upload ảnh của hàm done
        const done = () => {
            // const imageHeight = target.clientHeight;
            // const imageWidth = target.clientWidth;
            const img = document.getElementById("scream");
            const imageHeight = img.height;
            const imageWidth = img.width;
            loadImage(imageHeight, imageWidth, img)
        };
        done();
    };

    //ve anh
    const loadImage = (imageHeight, imageWidth, img) => {
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        c.width = imageWidth;
        c.height = imageHeight;
        ctx.drawImage(img, 0, 0);
    }

    // ve anh sau khi co data
    const drawImage = (x_min, y_min, x_max, y_max) => {
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(x_min, y_min, x_max - x_min, y_max - y_min);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }







    return (
        <div className="container">
            <h1 className="text-dark">Recognize</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={mb}>

                    <label htmlFor="formFile" className="form-label">Images</label>
                    <input ref="window" onChange={onChangePicture} name='image' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <div className="previewProfilePic" style={{ marginLeft: "90px" }}>
                        {/* <img className="playerProfilePic_home_tile" style={{ marginTop: '18px', objectFit: 'cover' }} width={200} height={260} src={imgData} /> */}
                    </div>

                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>
                <div >
                    <img id="scream" style={{ display: 'none' }} src={imgData} onLoad={handleImageLoad} />
                    <canvas style={{ width: '150px' }} id="myCanvas" />
                </div>
                <button style={button} type="submit" className="btn btn-dark">Submit</button>
            </form>
            <table style={table} className="table">
                <thead style={{ 'background-color': 'black', color: 'white' }} >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Similarity</th>
                        <th scope="col">Images</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        checkData.map((el, index) => (
                            <tr key={index}>
                                <td>
                                    <a variant="primary" onClick={() => setOpen(true)}>
                                        {el.name}

                                    </a>
                                    <Modal show={open} onHide={() => setOpen(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Personal information</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            ID: {el.faceInfo.id},
                                            <br />
                                            Họ tên: {el.faceInfo.fullname},
                                            <br />
                                            Ngày sinh: {el.faceInfo.dob},
                                            <br />
                                            Địa chỉ: {el.faceInfo.address},
                                            <br />
                                            Giới tính: {el.faceInfo.gender},



                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setOpen(false)}>
                                                Close
                                             </Button>

                                        </Modal.Footer>
                                    </Modal>



                                </td>
                                <td>{Math.round(el.similarity * 10000) / 100}%</td>
                                <td>
                                    <Zoom>
                                        <img
                                            alt=""
                                            src={el.image}
                                            width="50"
                                        />
                                    </Zoom>
                                </td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>


        </div >
    )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Check />, rootElement);
export default Check
