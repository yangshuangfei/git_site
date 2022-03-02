import request from '~/utils/request'

export default {
    getList(searchObj) {
        return request({
            url: '/api/edu/course/list',
            method: 'get',
            params: searchObj
        })
    },
    getSubjectNestedList() {
        return request({
            url: 'api/edu/subject/nested-list',
            method: 'get'
        })
    },
    getById(id) {
        return request({
            url: `api/edu/course/get/${id}`,
            method: 'get'
        })
    },
    getPlayAuth(videoid) {
        return request({
            url: `api/vod/video/get-play-auth/${videoid}`,
            method: 'get'
        })
    }

}