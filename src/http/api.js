import api from './axios.config'
import { ElLoading } from 'element-plus'


// /llm_model/list_running_models






export default {
    get_list_running_models: (data) => {
        data = data || { id: '666' }
        return api.post('/llm_model/list_running_models', { data })
    },
    // llm问答
    chat_Send: (data) => {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
        let msgTemplate = JSON.parse(localStorage.getItem('msgTemplate'))
        data = {
            ...msgTemplate,
            ...data

        }
        return new Promise((resolve, reject) => {
            api.post('/chat/chat', data, {
              
                // responseType: 'text', // 设置相应类型为文本
                onDownloadProgress: (progressEvent) => {
                    // 处理下载进度（可选）
                    console.log('下载进度：', progressEvent);
                    if (progressEvent.loaded === progressEvent.total) {
                        console.log('下载完成');
                    }
                }
            })
                .then(response => {
                    console.log('接收到响应:', response.data);
                    // 处理响应数据
                    loading.close()
                    resolve(response.data)
                })
                .catch(error => {
                    console.error('发生错误:', error);
                    // 错误处理逻辑
                    reject(error)
                });
            // api.post('/chat/chat', data, {
            //     responseType: 'text' // 将响应数据解析为文本格式})
            // })
        })
    }

}