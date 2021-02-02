import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const form = {
    marginLeft: "25px",
};
const h1 = {
    "text-align": "center",
    "padding-top": "50px"
};
const align = {
    position: "relative",
    top: "50px",
    left: "85px"
};
const col = {
    "margin-top": "8px",
    position: "relative",
    left: "300px",
    top: "-82px"
};
const table = {
    width: "900px",
    margin: "auto",
    position: "relative",
    top: "100px"
};
const input = {
    width: "200px",
    position: "relative",
}
const label = {
    float: "left"
}
const RecognizeHistory = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [reportData, setData] = useState(users)
    const onSubmit = data => search(data)

    // const onSubmit = valueFrom => console.log(valueFrom);

    const dataExport = [];
    const search = async (e) => {
        console.log(e);
        const dateFrom = new Date(e.from);
        const dateTo = new Date(e.to);
        const unixFrom = dateFrom.getTime() / 1000;
        const unixTo = dateTo.getTime() / 1000;
        console.log('key');
        console.log(unixFrom, unixTo);
        const dataPayload = {
            from: unixFrom,
            to: unixTo + 86400
        }
        const token = e.key;
        const data = await axios.post('https://ekyc-demo-api.trandata.io/api/v1/user/recognizeHistory', dataPayload, {
            headers: {
                'Content-Type': 'application/json',
                'apiKey': token
            },
        })

        // exportToCSV(data.data.Data, 'test nhe');
        // console.log(dataExport);
        setData(data.data.Data)
    }

    const exportToCSV = (dataExport) => {
        console.log(dataExport);
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const dateNow = new Date();

        //create fileName
        const dateFile = dateNow.getTime();
        const fileName = 'Report-' + dateFile;

        //biến đổi data theo đúng yêu cầu
        const custs = [];
        for (let i = 0; i < dataExport.length; i++) {
            const element = dataExport[i];
            custs.push({
                'SST': i + 1,
                'Mã': element.idNumber,
                'Tên': element.name,
                'Ngày': element.createdDate,
                'Giờ': element.createdTime,
                'So sánh': element.idMatched,
                'Xác nhận': element.confirm

            });
        }

        //Create File
        const ws = XLSX.utils.json_to_sheet(custs);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <div className="container">
            <form style={form} onSubmit={handleSubmit(onSubmit)}>
                <h1 style={h1} className="text-dark">Recognize History</h1>
                <div style={align} className="form-row align-items-center">

                    <div className="" style={{ 'width': '900px', marginTop: '20px', 'display': 'flex', 'alignItems': 'flex-end', 'justifyContent': 'space-around' }}>

                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label htmlFor="formFile">Authen Key</label>
                            <input name='key' type="text" className="form-control" ref={register} />
                        </div>

                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label htmlFor="formFile">Form date</label>
                            <input name='from' style={input} type="date" className="form-control" ref={register} />
                        </div>

                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label htmlFor="formFile">To date</label>
                            <input name='to' style={input} type="date" className="form-control" ref={register} />
                        </div>
                        <button type="submit" className="btn btn-dark mb-3">Search</button>

                        <button type="button" onClick={() => exportToCSV(reportData)} className="btn btn-dark mb-3">Export</button>
                    </div>
                </div>
            </form>

            <table style={table} className="table">
                <thead style={{ 'background-color': 'black', color: 'white' }} className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Mã</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Giờ</th>
                        <th scope="col">So sánh</th>
                        <th scope="col">Xác nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reportData.map((el, index) => (
                            <tr key={index}>
                                <th scope="row">{el.id}</th>
                                <td>{el.idNumber}</td>
                                <td>{el.name}</td>
                                <td>{el.createdDate}</td>
                                <td>{el.createdTime}</td>
                                <td>{el.idMatched}</td>
                                <td>{el.confirm}</td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div >

    )
}

RecognizeHistory.propTypes = {

}

export default RecognizeHistory
