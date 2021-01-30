export default {
    methods: {
        async loadData(url) {
            let response = await fetch(url);
            let responseData = await response.json();
            if(responseData.con){
                return responseData.data;
            }else{
                return [];
            }
        },
        async sendData(url, data) {
            let response = await fetch(url, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            });
            return await response.json();
        }
    }
}