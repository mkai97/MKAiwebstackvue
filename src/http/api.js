import api from './axios.config'
import genID from "@/utils/genID";



// /llm_model/list_running_models






export default {
    get_list_running_models: (data) => {

        data = data || { id: '666' }
        return api.post('/llm_model/list_running_models', { data })
    },
    // llm问答
    chat_Send: (data, callback) => {

        let msgTemplate = JSON.parse(localStorage.getItem('msgTemplate'))
        data = {
            ...msgTemplate,
            ...data

        }
        return api.post('/chat/chat', data, {

            // responseType: 'text', // 设置相应类型为文本
            onDownloadProgress: (progressEvent) => {
                // 处理下载进度（可选）
                console.log('下载进度：', progressEvent);
                var responseText = progressEvent.event.currentTarget.responseText
                var message_id = ''
                responseText = JSON.parse(`[${responseText.replace(/}{/g, '},{')}]`)


                var response = {
                    responseText: responseText.map((message) => message.text).join(""),
                    message_id: responseText[0].message_id
                }
                console.log('下载文字进度：', response);

                callback(response)
            }
        }).then(response => {
            console.log('接收到响应:', response.data);
            // 处理响应数据
            // resolve(response.data)
        })
            .catch(error => {
                console.error('发生错误:', error);
                // 错误处理逻辑
                reject(error)
            });
        // api.post('/chat/chat', data, {
        //     responseType: 'text' // 将响应数据解析为文本格式})
        // })

    },

    // 知识库问答
    KBchat_Send: (data, callback) => {

        let msgTemplate = JSON.parse(localStorage.getItem('msgTemplateKB'))
        data = {
            ...msgTemplate,
            ...data

        }
        var message_id = genID()
        return api.post('/chat/knowledge_base_chat', data, {

            // responseType: 'text', // 设置相应类型为文本
            onDownloadProgress: (progressEvent) => {
                // 处理下载进度（可选）
                console.log('下载进度：', progressEvent);
                var responseText = progressEvent.event.currentTarget.responseText
                responseText = JSON.parse(`[${responseText.replace(/}{/g, '},{')}]`)


                var response = {
                    responseText: responseText.map((message) => message.answer).join(""),
                    message_id: message_id
                }
                if (responseText[responseText.length - 1]?.docs && responseText[responseText.length - 1]?.docs.length) {
                    response.docs = responseText[responseText.length - 1]?.docs

                }


                console.log('下载文字进度：', response);

                callback(response)
            }
        }).then(response => {
            console.log('接收到响应:', response.data);
            // 处理响应数据
            // resolve(response.data)
        })
            .catch(error => {
                console.error('发生错误:', error);
                // 错误处理逻辑
                reject(error)
            });
        // api.post('/chat/chat', data, {
        //     responseType: 'text' // 将响应数据解析为文本格式})
        // })

    },
    //知识库列表
    get_list_knowledge_base: (data) => {
        data = data || { id: '666' }
        return api.get('/knowledge_base/list_knowledge_bases')
    },
    // 获取知识库文件列表
    get_KB_list_files: (params) => {
        console.log('params', params)

        return api.get('/knowledge_base/list_files', { params })
    },
    // upload_docs_KB: (data) => {
    //     data = data || { id: '666' }
    //     return api.post('/knowledge_base/upload_docs', data)
    // },
    // 上传文件
    upload_file_KB: api.defaults.baseURL + "/knowledge_base/upload_docs",
    //删除知识库文档
    delete_docs: (data) => {
        data = data || { id: '666' }
        return api.post('/knowledge_base/delete_docs', data)
    },
    // 下载文件
    download_doc: (data) => {
        var params = {
            ...data,
            preview: false
        }
        return api.get('/knowledge_base/download_doc', { params, responseType: 'blob' })
    },
    // 查看文件
    show_doc: (data) => {
        var params = {
            ...data,
            preview: true
        }
        return api.get('/knowledge_base/download_doc', { params, responseType: 'blob' })
    },

    //新建知识库
    create_knowledge_base: (data) => {
        data = {
            ...data,
            // "vector_store_type": "faiss",
            // "embed_model": "m3e-base"
        }
        return api.post('/knowledge_base/create_knowledge_base', data)
    },



}
