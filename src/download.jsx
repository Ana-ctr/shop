import React, { useState } from "react";
import axios from 'axios';
import { message } from "antd";
const Download = () => {
    

    const [update, setUpdate] = useState([]);
    const [foto, setFoto] = useState(null);

    let File = async () => {
        let form = new FormData()
        form.append('file', update[0])
        let singleFile = await axios({

            url: `https://api.escuelajs.co/api/v1/files/upload`,
            method: "post",
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }


        })
        console.log (singleFile)
        if (singleFile.status == 201) {
             message.success('image added!') ;
            setFoto(singleFile.data.location)

        }
        else {
             message.success('not added!') ;
        }
    }

    return (

        <div className="form-group" >
            <input
                type="file"
                onChange={(e) => setUpdate(e.target.files)}
                placeholder="Enter"
                required
            />
            <button
     type="button"
     className="btn btn-secondary btn-block mt-2"
     onClick={File}
   >
     Add
   </button>

   {foto!=null ? <img src={foto} width='100px' heigth='100px'></img>:<></>}
        </div >


    )
}

export default Download;