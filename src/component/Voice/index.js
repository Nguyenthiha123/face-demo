import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
const form = {
    padding: '100px',
    position: 'relative',
    left: '380px'
};
const mb = {
    width: '400px',
    'margin-left': '120px',
};
const label = {
    float: 'left'
};
const button = {
    position: 'relative',
    top: '20px'
};
const span = {
    color: 'red'
};


const Voice = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => voice(data);
    const history = useHistory()

    const voice = async (e) => {
        const Data = new FormData();
        console.log(e.audios1[0])
        if (e.audios1[0] != null || undefined) {
            Data.append('audios', e.audios1[0])
        }
        if (e.audios2[0] != null || undefined) {
            Data.append('audios', e.audios2[0])
        }
        if (e.audios3[0] != null || undefined) {
            Data.append('audios', e.audios3[0])
        }


        if (e.audios1[0] != null || undefined) {
            Data.append('text[]', e.text1)
        }
        if (e.audios2[0] != null || undefined) {
            Data.append('text[]', e.text2)
        }
        if (e.audios3[0] != null || undefined) {
            Data.append('text[]', e.text3)
        }
        Data.append('name', e.name)

        const data = await axios.post('http://52.221.81.214:4556/api/v1/voice/register', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log(data)

        history.push('/voice')
        Swal.fire(
            'Thành công',
            'You clicked the button!',
            'success'
        )
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-success">Register Voice</h1>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="formFile" className="form-label">Giọng nói<span style={span}>*</span></label>
                            <input name='audios1' ref={register({ required: true })} className="form-control" type="file" accept="audio" id="formFile" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                            </small>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="exampleInputEmail1" className="form-label">Nội dung<span style={span}>*</span></label>
                            <input name='text1' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                                {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="formFile" className="form-label">Giọng nói<span style={span}>*</span></label>
                            <input name='audios2' ref={register({ required: true })} className="form-control" type="file" accept="audio" id="formFile" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                            </small>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="exampleInputEmail1" className="form-label">Nội dung<span style={span}>*</span></label>
                            <input name='text2' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                                {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                            </small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="formFile" className="form-label">Giọng nói<span style={span}>*</span></label>
                            <input name='audios3' ref={register({ required: true })} className="form-control" type="file" accept="audio" id="formFile" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                            </small>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3" style={mb}>
                            <label style={label} htmlFor="exampleInputEmail1" className="form-label">Nội dung<span style={span}>*</span></label>
                            <input name='text3' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small className="form-text text-danger">
                                {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                                {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                            </small>
                        </div>
                    </div>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="exampleInputEmail1" className="form-label">Họ tên<span style={span}>*</span></label>
                    <input name='name' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                    </small>
                </div>


                <button style={button} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

Voice.propTypes = {

}

export default Voice
