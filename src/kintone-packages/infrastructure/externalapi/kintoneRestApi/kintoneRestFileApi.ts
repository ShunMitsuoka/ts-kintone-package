import axios from "../../../../../node_modules/axios/index";

export class KintoneRestFileApi {
    public upload(file: File) : Promise<any>{
        const formData = new FormData();
        formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
        formData.append("file", file);
        const config = {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'content-type': 'multipart/form-data',
            },
        }
        return axios.post(
            kintone.api.url('/k/v1/file.json',true),
            formData,
            config
        )
    }
}