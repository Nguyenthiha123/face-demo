import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
const form = {
    margin: 'auto'
};
const mb = {
    width: '500px',
    margin: 'auto'
};
const label = {
    float: 'left'
};
const button = {
    margin: 'auto'

};
const span = {
    color: 'red'
};

const Register = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => addRegister(data);
    const history = useHistory()

    const addRegister = async (e) => {
        const Data = new FormData();
        // console.log(e.images1[0])
        Data.append('image', e.image[0]);
        Data.append('name', e.name);

        console.log(Data)
        const data = await axios.post('https://facedemo-api.dev.trandata.io/api/v1/facedemo/register', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log(data)

        history.push('/')
        Swal.fire(
            'Thành công',
            'You clicked the button!',
            'success'
        )
    }
    return (
        <div className="container">
            <form style={form} onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{ margin: 'auto' }} className="text-dark">Register</h1>
                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Hình ảnh<span style={span}>*</span></label>
                    <input name='image' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="exampleInputEmail1" className="form-label">Họ tên<span style={span}>*</span></label>
                    <input name='name' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                    </small>
                </div>

                {/* <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="exampleInputPassword1" className="form-label">Ngày sinh<span style={span}>*</span></label>
                    <input name='dob' type='date' ref={register({ required: true, minLength: 3 })} className="form-control" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                    </small>
                </div> */}

                <button style={button} type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}

Register.propTypes = {
}

export default Register
